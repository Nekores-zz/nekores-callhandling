import React, { Component, Fragment } from "react";
import { CircularProgress } from "@material-ui/core";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Row } from "components/Elements";

export function PromiseWithCallback(promise, onSuccess, onError) {
  return new Promise((resolve, reject) => {
    promise
      .then(
        onSuccess
          ? data => {
              resolve(data);
              onSuccess(data);
            }
          : resolve
      )
      .catch(
        onError
          ? error => {
              reject(error);
              onError(error);
            }
          : reject
      );
  });
}

export const promiseFromObject = object =>
  new Promise((resolve, reject) => {
    let keys = Object.keys(object);
    let results = {};
    let counter = 0;
    keys.forEach(key => {
      let handleResolve = result => {
        counter += 1;
        results[key] = result;
        if (counter === keys.length) {
          resolve(results);
        }
      };
      if (object[key] instanceof Promise) {
        object[key].then(handleResolve).catch(reject);
      } else {
        handleResolve(results);
      }
    });
  });

export function withPromiseProps(getPromises, C) {
    return class WithPromiseProps extends Component {
        unmounted = false;

        state = {
            result: null
        };

        componentWillMount() {
            let promise = promiseFromObject(getPromises(this.props));
            promise.then(result => {
                if (!this.unmounted) {
                    this.setState({ result });
                }
            });
        }

        componentWillUnmount() {
            this.unmounted = true;
        }

        render() {
            return this.state.result ? (
                <C {...this.props} {...this.state.result} />
            ) : (
                <Row justifyChildrenCenter>
                    <CircularProgress />
                </Row>
            );
        }
    };
}
