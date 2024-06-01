import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';



const initialValues = {
    name: '',
    email: '',
    channel: '',
}


const validate = values => {
    let errors = {}
    if (!values.name) {
        errors.name = 'Required';
    }

    if (!values.email) {
        errors.email = 'Required';
    }
    else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }

    if (!values.channel) {
        errors.channel = 'Required';
    }
    return errors
}

const validationSchema = Yup.object({
    name: Yup.string().required('Required').min(3, 'Name Must Be More Than 3 Characters'),
    email: Yup.string().required('Required').email('Invalid Email Address'),
    channel: Yup.string().required('Required').min(3, 'Channel Name Must Be More Than 3 Characters')
})


const onSubmit = values => {
    console.log("Form Data", values);
}


const OldYoutubeForm = () => {

    const formik = useFormik({
        initialValues,
        onSubmit,
        // validate
        validationSchema
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className='form-control'>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} />
                {formik.errors.name && formik.touched.name ? <div className='error'>{formik.errors.name}</div> : null}
            </div>
            <div className='form-control'>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
                {formik.errors.email && formik.touched.email ? <div className='error'> {formik.errors.email}</div> : null}
            </div>
            <div className='form-control'>
                <label htmlFor="channel">Channel</label>
                <input type="text" name="channel" id="channel" onChange={formik.handleChange} value={formik.values.channel} onBlur={formik.handleBlur} />
                {formik.errors.channel && formik.touched.channel ? <div className='error'> {formik.errors.channel}</div> : null}
            </div>
            <button type='submit'>Submit</button>
        </form>
    )
}



export default OldYoutubeForm;