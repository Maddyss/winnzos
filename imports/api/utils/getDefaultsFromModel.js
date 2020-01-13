import isUndefined from 'lodash/isUndefined';

const getDefaultsFromModel = Model =>
  Object.keys(Model).reduce((acc, key) => {
    const defaultValue = Model[key].defaultValue;
    if (!isUndefined(defaultValue)) {
      return { ...acc, [key]: defaultValue };
    }
    return acc;
  }, {});

export default getDefaultsFromModel;
