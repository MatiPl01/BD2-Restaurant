type WithProperty<Type, Key extends keyof Type> = Type & {
    [Property in Key]-?: Type[Property];
};


export default WithProperty;
