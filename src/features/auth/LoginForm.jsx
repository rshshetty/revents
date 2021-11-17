import React,{useState} from 'react';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Button, Label, Divider } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../app/common/modals/modalReducer';
import { signInWithEmail } from '../../app/firestore/firebaseService';
import SocialLogin from './SocialLogin';


 const initialValues = { email: '', password: '' }

const savedValues={email:'bruce@test.com', password:'123456'}

 const validationSchema=Yup.object({
                    email: Yup.string().required().email(),
                    password: Yup.string().required()
  })

export default function LoginForm() {
    const dispatch = useDispatch();

let [loadvalues,SetLoadvalues]=useState(null)


    


    return (
        <ModalWrapper size='mini' header='Sign in to Re-vents'>
            <Formik
                initialValues={loadvalues || initialValues}
                enableReinitialize
                validationSchema={validationSchema}
   
              
                         
                onSubmit={async (values, {setSubmitting, setErrors}) => {
                    try {
                     
                        await signInWithEmail(values);
                       
                        setSubmitting(false);
                        dispatch(closeModal());
                    } catch (error) {
                        setErrors({auth: 'Problem with username or password'});
                        setSubmitting(false);
                    }
                }}
            >  
       
      

    
   
                {({isSubmitting, isValid,errors}) => (
                    <Form className='ui form' style={{display:"flex",flexDirection:'column'}}>
                        
                  
                        <button type="button" style={{marginBottom:'20px',borderRadius:'3px',padding:'5px'}}
                   onClick={()=>SetLoadvalues(savedValues)}
                  >    Load saved credentials
                  </button>
                        <MyTextInput name='email' placeholder='Email Address' />
                        <MyTextInput name='password' placeholder='Password' type='password' />
                        {errors.auth && <Label basic color='red' style={{marginBottom: 10}} content={errors.auth} />}
                        <Button 
                            loading={isSubmitting}
                            disabled={!isValid || isSubmitting}
                            type='submit'
                            fluid
                            size='large'
                            color='teal'
                            content='Login'
                        />
                        <Divider horizontal>Or</Divider>
                        <SocialLogin />
                    </Form>
                )}
            </Formik>
        </ModalWrapper>
    )
}