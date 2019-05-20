// @flow

import i18n from '../i18n';

opaque type ValidatorType = {
    [key: string]: {
        message: string,
        regexp: RegExp,
        validate: Function
    }
}

opaque type ValidatorsType = {
    [key: string]: ValidatorType
}

const VALIDATORS: ValidatorsType = {
    email: {
        isCorrect: {
            message: i18n.EMAIL_IS_NOT_CORRECT,
            regexp: /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/,
            validate(value) {
                return this.regexp.test(value);
            }
        }
    },
    password: {
        isWeak: {
            message: i18n.PASSWORD_IS_WEAK,
            regexp: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,64})/,
            validate(value) {
                return this.regexp.test(value);
            }
        }
    },
    string: {
        notEmpty: {
            message: i18n.STRING_SHOULD_BE_NOT_EMPTY,
            validate(value) {
                return value.length > 0;
            }
        }
    }
};

export default function validate(type: string, rules: string[] = [], value: mixed) {
    const validator = VALIDATORS[type];
    if (!validator) {
        return false;
    }
    return {[type]: rules.map(rule => validator[rule].validate(value) ? '' : validator[rule].message)};
};
