import React from 'react';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
    name: '',
    email: '',
    channel: '',
    address: '',
    social: {
        youtube: '',
        facebook: '',
        twitter: ''
    },
    phNumbers: ['']
}

const validationSchema = Yup.object({
    name: Yup.string().required('Required').min(3, 'Name must be more than 3 characters'),
    email: Yup.string().required('Required').email('Invalid email address'),
    channel: Yup.string().required('Required').min(3, 'Channel must be more than 3 characters'),
    address: Yup.string().required('Required').min(3, 'Address must be more than 3 characters'),
    social: Yup.object({
        youtube: Yup.string().required('Required').min(3, 'YouTube must be more than 3 characters'),
        facebook: Yup.string().required('Required').min(3, 'Facebook must be more than 3 characters'),
        twitter: Yup.string().required('Required').min(3, 'Twitter must be more than 3 characters')
    })
})

const onSubmit = (values, onSubmit) => {
    console.log("Form Data", values);
    console.log('onSubmit', onSubmit)
    onSubmit.setSubmitting(false);
    onSubmit.resetForm(initialValues);
}

const ManuallyTrigeringValidation = () => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnMount
        >
            {
                formik => {
                    return (
                        <Form>
                            <div className='form-control'>
                                <label htmlFor="name">Name</label>
                                <Field type="text" name="name" id="name" />
                                <div className="error">
                                    <ErrorMessage name='name' />
                                </div>
                            </div>
                            <div className='form-control'>
                                <label htmlFor="email">Email</label>
                                <Field type="email" name="email" id="email" />
                                <div className="error">
                                    <ErrorMessage name='email' />
                                </div>
                            </div>
                            <div className='form-control'>
                                <label htmlFor="channel">Channel</label>
                                <Field type="text" name="channel" id="channel" />
                                <ErrorMessage name='channel'>
                                    {(errormsg) => <div className='error'>{errormsg}</div>}
                                </ErrorMessage>
                            </div>
                            <div className='form-control'>
                                <label htmlFor="address">Address</label>
                                <Field name="address">
                                    {
                                        ({ field, meta }) => (
                                            <div>
                                                <input type='text' id='address' {...field} />
                                                {meta.touched && meta.error ? (
                                                    <div className="error">
                                                        {meta.error}
                                                    </div>
                                                ) : null}
                                            </div>
                                        )
                                    }
                                </Field>
                            </div>
                            <div className='form-control'>
                                <label htmlFor="youtube">YouTube</label>
                                <Field type="text" name="social.youtube" id="youtube" />
                                <div className="error">
                                    <ErrorMessage name='social.youtube' />
                                </div>
                            </div>
                            <div className='form-control'>
                                <label htmlFor="facebook">Facebook</label>
                                <Field type="text" name="social.facebook" id="facebook" />
                                <div className="error">
                                    <ErrorMessage name='social.facebook' />
                                </div>
                            </div>
                            <div className='form-control'>
                                <label htmlFor="twitter">Twitter</label>
                                <Field type="text" name="social.twitter" id="twitter" />
                                <div className="error">
                                    <ErrorMessage name='social.twitter' />
                                </div>
                            </div>
                            <div className='form-control'>
                                <label htmlFor='phNumbers'>List of Phone Numbers</label>
                                <FieldArray name='phNumbers'>
                                    {
                                        ({ remove, push, form }) => {
                                            const { values } = form;
                                            const { phNumbers } = values;
                                            return (
                                                <div>
                                                    {
                                                        phNumbers.map((phone, index) => (
                                                            <div key={index}>
                                                                <Field name={`phNumbers[${index}]`} />
                                                                {index > 0 && (
                                                                    <button type='button' onClick={() => remove(index)}> - </button>
                                                                )}
                                                                <button type='button' onClick={() => push('')}> + </button>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            )
                                        }
                                    }
                                </FieldArray>
                            </div>
                            <button type='button' onClick={() => formik.validateField('address')}>Validate Address </button>
                            <button type='button' onClick={() => formik.validateForm()}>Validate All </button>
                            <button type='button' onClick={() => formik.setFieldTouched('address')}>Touched Address </button>
                            <button type='button' onClick={() => formik.setTouched({
                                address: true,
                                phNumbers: true,
                                email: true,
                                name: true,
                                channel: true,
                                social: {
                                    youtube: true,
                                    facebook: true,
                                    twitter: true
                                }
                            })}>Touched All </button>
                            <button type='submit' disabled={!formik.isValid || formik.isSubmitting}>Submit</button>
                        </Form>
                    )
                }
            }
        </Formik>
    )
}

export default ManuallyTrigeringValidation;
