import React from 'react';
import { ErrorMessage, FastField, Field, FieldArray, Form, Formik } from 'formik';
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
    name: Yup.string().required('Required').min(3, 'Name Must Be More Than 3 Characters'),
    email: Yup.string().required('Required').email('Invalid Email Address'),
    channel: Yup.string().required('Required').min(3, 'Channel Must Be More Than 3 Characters'),
    address: Yup.string().required('Required').min(3, 'Address Must Be More Than 3 Characters'),
    // youtube: Yup.string().required('Required').min(3, 'Youtube Must Be More Than 3 Characters'),
    // facebook: Yup.string().required('Required').min(3, 'Youtube Must Be More Than 3 Characters'),
    // twitter: Yup.string().required('Required').min(3, 'Youtube Must Be More Than 3 Characters')

})
const onSubmit = values => {
    console.log("Form Data", values);
}
const YoutubeFormik = () => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form>
                <div className='form-control'>
                    <label htmlFor="name">Name</label>
                    <Field type="text" name="name" id="name" />
                    <div style={{ color: "red" }}>
                        <ErrorMessage name='name' />
                    </div>
                </div>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <Field type="email" name="email" id="email" />
                    <div style={{ color: "red" }}>
                        <ErrorMessage name='email' />
                    </div>
                </div>
                {/* ErrorMessage Revisited */}
                <div className='form-control'>
                    <label htmlFor="channel">Channel</label>
                    <Field type="text" name="channel" id="channel" />
                    <ErrorMessage name='channel' >
                        {(errormsg) => <div className='error'>{errormsg}</div>}
                    </ErrorMessage>
                </div>
                {/* Field Revisited */}
                <div className='form-control'>
                    <label htmlFor="address">Address</label>
                    <Field name="address" >
                        {
                            (props) => {
                                console.log('field Render')
                                const { field, form, meta } = props
                                return <div>
                                    <input type='text' id='address' {...field} />
                                    {meta.touched && meta.error ? <div style={{ color: 'red' }}>
                                        <ErrorMessage name='address' />
                                    </div> : null}
                                </div>
                            }
                        }
                    </Field>
                </div>

                {/* Nested object  */}
                {/*
             <div className='form-control'>
                 <label htmlFor='youtube'>Youtube</label>
                 <Field type='text' name='social.youtube' id='youtube' />
             </div>
             <div className='form-control'>
                 <label htmlFor='facebook'>Facebook</label>
                 <Field type='text' name='social.facebook' id='facebook' />
             </div>
             <div className='form-control'>
                 <label htmlFor='twitter'>Twitter</label>
                 <Field type='text' name='social.twitter' id='twitter' />
             </div>
         */}
                {/* FeildArray */}
                <div className='form-control'>
                    <label htmlFor='phNumbers'>List of Phone Numbers</label>
                    <FieldArray name='phNumbers'>
                        {
                            fieldArrayPhone => {
                                const { remove, push, form } = fieldArrayPhone;
                                const { values } = form;
                                const { phNumbers } = values;
                                return (
                                    <div>
                                        {
                                            phNumbers.map((phone, index) => {
                                                return (
                                                    <div key={index}>
                                                        <Field name={`phNumbers[${index}]`} />
                                                        {
                                                            index > 0 && (
                                                                <button type='button' onClick={() => remove(index)}> - </button>
                                                            )}
                                                        <button type='button' onClick={() => push('')}> + </button>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            }
                        }
                    </FieldArray>
                </div>

                <button type='submit'>Submit</button>
            </Form>
        </Formik>
    )
}
export default YoutubeFormik;