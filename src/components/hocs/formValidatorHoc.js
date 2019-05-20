// @flow

import React, {Component} from 'react';
import validatorService from '../../services/validatorService';
import _ from 'lodash';
import type { AbstractComponent, Node } from 'react';

type Props = {};
type State = {
    errors: {
        [key: string]: mixed
    }
}

type ConfigType = {
    handleChange: Function,
    haveErrors: Function,
    prepareAndValidate: Function,
    validator: State
};

export default function formValidatorHoc(WrappedComponent: AbstractComponent<ConfigType>): any {
    return class FormValidator extends Component<Props, State> {
        ref: any;

        state = {
            errors: {}
        };

        constructor(props: Props, context: any) {
            super(props, context);
        }

        getInputValue(input) {
            if (input.type === 'checkbox') {
                return input.checked;
            }
            return input.value;
        }

        prepareAndValidate = (node: HTMLInputElement): void => {
            const name = node.name;
            const {validatorType, validatorRules} = node.dataset;
            if (validatorType && validatorRules) {
                this.validate(name, validatorType, validatorRules.split(' '), node.value);
            }
        };

        handleChange = (context: Component<any, any>, e: Object): void => {
            const target = e.target;
            this.prepareAndValidate(target);
            context.setState((prevState) => {
                _.set(prevState, target.name, this.getInputValue(target));
                return prevState;
            });
        };

        haveErrors = (): boolean => {
            return !!Object.values(this.state.errors).find(errorText => errorText !== '');
        };

        validate = (name: string, type: string, rules: string[], value: string): mixed => {
            const errors = validatorService(type, rules, value);
            // $FlowFixMe https://github.com/facebook/flow/issues/3146
            const error = errors[type] ? Object.values(errors[type]).find( ruleValidation => ruleValidation !== '') : null;
            if (error) {
                return this.setState((prevState) => {
                    prevState.errors[name] = error;
                    return prevState;
                });
            }
            return this.setState((prevState) => {
                prevState.errors[name] = '';
                return prevState;
            });
        };

        render(): Node {
            return (
                <WrappedComponent
                    ref = {el => this.ref = el}
                    handleChange={this.handleChange}
                    haveErrors={this.haveErrors}
                    validator={this.state}
                    prepareAndValidate={this.prepareAndValidate}
                    {...this.props}
                />
            );
        }
    }
}
