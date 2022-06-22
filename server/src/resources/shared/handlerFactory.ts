import { Request, Response } from 'express';
import { Model } from 'mongoose';

import catchAsync from '@/utils/errors/catch-async';
import AppError from '@/utils/errors/app.error';
import response from '@/utils/response';


const findOne = (
    model: Model<any>,
    findBy?: { query?: string[], params?: string[] }
) => catchAsync(async (
    req: Request,
    res: Response
): Promise<void> => {
    let doc;
    let fields: { [key: string]: any } = {};
    if (req.fields) Object.assign(fields, req.fields);

    if (findBy) {
        const searchFilters = getSearchFilters(req, findBy);
        doc = await model.findOne(searchFilters, fields);
        if (!doc) throw new AppError(404, `Cannot find document with ${
            searchFilters.items().map(([key, val]: any[]) => `${key}: ${val}`).join(', ')
        }`);
    } else {
        doc = await model.findOne({}, fields);
        if (!doc) throw new AppError(404, 'Cannot find document');
    }

    await response.json(res, 200, doc);
});

const findById = (
    model: Model<any>,
    limitFields: boolean = false
) => catchAsync(async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    let doc;

    if (limitFields) doc = await model.findById(id, req.fields);
    else doc = await model.findById(id);

    if (!doc) throw new AppError(404, `Cannot find document with id ${id}`);

    await response.json(res, 200, doc);
});

const findMany = (
    model: Model<any>
) => catchAsync(async (
    req: Request,
    res: Response
): Promise<void> => {
    let filters: { [key: string]: any } = {};
    let fields: { [key: string]: any } = {};
    let pagination: { [key: string]: any } = {};
    let page = 1;
    let limit = 30;

    if (req.filters) Object.assign(filters, req.filters);
    if (req.fields) Object.assign(fields, req.fields);
    if (req.query.page && req.query.limit) {
        page = +(req.query.page || 1);
        limit = +(req.query.limit || 30);
        pagination = {
            skip: (page - 1) * limit,
            limit: limit
        };
    }

    const docs = await model.find(filters, fields, pagination);

    await response.json(res, 200, docs);
});

const deleteById = (
    model: Model<any>
) => catchAsync(async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    const doc = await model.findByIdAndDelete(id);

    if (!doc) throw new AppError(404, `Cannot delete document with id ${id}`);

    await response.json(res, 204, null);
});

const deleteOne = (
    model: Model<any>,
    deleteBy: { query?: string[], params?: string[] }
) => catchAsync(async (
    req: Request,
    res: Response
): Promise<void> => {
    const searchFilters = getSearchFilters(req, deleteBy);

    const doc = await model.deleteOne(searchFilters);

    if (!doc) throw new AppError(404, `Cannot delete document with ${
        searchFilters.items().map(([key, val]: any[]) => `${key}: ${val}`).join(', ')
    }`);

    await response.json(res, 204, null);
});


const getSearchFilters = (
    req: Request,
    searchBy: { query?: string[], params?: string[] }
) => {
    const filters: { [key: string]: any } = {};

    Object.entries(searchBy).forEach(([key, filterValues]: [string, string[]]) => {
        const searchIn = req[key as keyof Request];
        filterValues.forEach(filter => {
            if (searchIn[filter] == undefined) {
                throw new AppError(500, `Cannot delete document. ${filter} was not specified in the URL params`);
            }
            filters[filter] = searchIn[filter];
        });
    });
    return filters;
};


export default {
    findOne,
    findById,
    findMany,
    deleteById,
    deleteOne
};
