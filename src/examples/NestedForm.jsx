import React, { Component } from 'react';
import Form, { FormItem, FormCore } from 'noform';
import { Input} from 'noform/lib/wrapper/antd';
import { InlineRepeater } from 'noform/lib/repeater/antd';


const validateConfig = {
    port: { type: 'string', required: true },
    targetPort: { type: 'string', required: true },
};

const execValidateConfig = {
    command: { type: 'string', required: true },
};

const httpValidateConfig = {
    port: { type: 'string', required: true },
};

class Example extends Component {
    constructor(props, context) {
        super(props, context);
        this.core = new FormCore({
            onChange: (fireKeys, values, ctx) => {
                
            },
            values: {
                name: 'aaa',
                ports: [
                    { port: '8080', targetPort: '9090' },
                    { port: '9090', targetPort: '9091' }
                ],
                livenessProbe: {
                    exec: [{ command: '/bin/sh' }],
                    http: [{ port: '9090' }]
                },
                img: ''
            }
        });

        this.formConfig = {
            validateConfig,
            autoValidate: true
        };

        this.execFormConfig = {
            validateConfig: execValidateConfig,
            autoValidate: true
        };

        this.httpFormConfig = {
            validateConfig: httpValidateConfig,
            autoValidate: true
        };
    }

    componentDidMount = () => {
        // asyncTask
        setTimeout(() => {
            this.core.setValues({
                img: 'abcd'
            })
        }, 500);
    }

    render() {
        return (<div>
            <Form core={this.core} layout={{ label: 8, control: 16 }}>
                <FormItem label="name" name="name"><Input /></FormItem>
                <FormItem label="ports" name="ports">
                    <InlineRepeater multiple formConfig={this.formConfig}>
                        <FormItem label="port" name="port"><Input style={{ width: '100px' }} /></FormItem>
                        <FormItem label="targetPort" name="targetPort"><Input style={{ width: '100px' }} /></FormItem>
                    </InlineRepeater>
                </FormItem>
                <FormItem label="livenessProbe" name="livenessProbe">
                    <Form layout={{ label: 0, control: 24 }}>
                        <FormItem label="exec" name="exec">
                            <InlineRepeater multiple formConfig={this.execFormConfig}>
                                <FormItem label="command" name="command"><Input style={{ width: '100px' }} /></FormItem>
                            </InlineRepeater>
                        </FormItem>
                        <FormItem label="http" name="http">
                            <InlineRepeater multiple formConfig={this.httpFormConfig}>
                                <FormItem label="port" name="port"><Input style={{ width: '100px' }} /></FormItem>
                            </InlineRepeater>
                        </FormItem>
                    </Form>
                </FormItem>
                <FormItem label="img" name="img"><Input /></FormItem>
            </Form>
        </div>);
    }
}

export default Example;
