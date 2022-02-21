import { useState } from 'react';
/* eslint-disable @next/next/google-font-display */
/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head';
import Box from '@mui/material/Box';
import React from 'react';
import Image from 'next/image';
import Divider from '@mui/material/Divider';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { gql, useMutation } from '@apollo/client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().trim().email().required(),
  city: yup.string().trim().required(),
  persona: yup.string().trim().required(),
  type: yup.string().trim(),
  demography: yup.string().trim().required(),
});

const ADD_TO_WAIT_LIST = gql`
  mutation addToWaitlist(
    $city: String!
    $demography: String!
    $email: String!
    $persona: String!
    $type: String!
  ) {
    addMailchimpWaitlist(
      demography: $demography
      email: $email
      city: $city
      type: $type
      persona: $persona
    )
  }
`;
const Home = () => {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation('landing');
  const [addToWaitlistMutation, { data, loading, error }] =
    useMutation(ADD_TO_WAIT_LIST);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const watchPersona = watch('persona');
  const onSubmit = async (data) => {
    await addToWaitlistMutation({
      variables: {
        ...data,
      },
    });
    if (!error) {
      setSuccess(true);
    }
  };

  return (
    <div className='container'>
      <Head>
        <title>Sliike</title>
        <meta name='description' content='Generated by create next app' />
      </Head>
      <div className='container'>
        <div className='section-one'>
          <div>
            <div className={'first-write-up'}>{t('title')}</div>
            <div className={'second-write-up'}>
              We will be back in XX days XX hours XX mins XX sec
            </div>
          </div>
          <div className={'buttonCon'}>
            <button onClick={() => setOpen(true)} className={'Button'}>
              <div>
                Tap for more
                <ArrowDownwardIcon />
              </div>
            </button>
          </div>
          <div className={`popup ${open ? 'open' : 'close'}`}>
            <div className={'expectCon'}>
              <div className={'expect'}>
                What to <span className={'expectItems'}>EXPECT</span> on our{' '}
                <span className={'expectItems'}>UPGRADED APP</span>
              </div>
            </div>
            <div className={'phoneComponents'}>
              <div className={'phone'}>
                <div>
                  <div className={'components'}>
                    <Image
                      src='/img/ellipse.png'
                      alt='sliike Logo'
                      width='13px'
                      height='13px'
                    />
                    <span className={'expectations'}>
                      Online marketplace for beauty services and products.
                    </span>
                  </div>
                  <div className={'components'}>
                    <Image
                      src='/img/ellipse.png'
                      alt='sliike Logo'
                      width='13px'
                      height='13px'
                    />
                    <span className={'expectations'}>
                      More clients for Independent beauticians and salon owners
                    </span>
                  </div>
                  <div className={'components'}>
                    <Image
                      src='/img/ellipse.png'
                      alt='sliike Logo'
                      width='13px'
                      height='13px'
                    />
                    <span className={'expectations'}>
                      Frictionless transactions between beauticians and clients
                    </span>
                  </div>
                  <div className={'components'}>
                    <Image
                      src='/img/ellipse.png'
                      alt='sliike Logo'
                      width='13px'
                      height='13px'
                    />
                    <span className={'expectations'}>
                      A platform of Afro-caribbean community and more
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className={'buttonCon2'}>
              <button onClick={() => setOpen(false)} className={'Button'}>
                <div>
                  <ArrowUpwardIcon />
                  <div>Tap for more</div>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className={'sectionTwo'}>
          <div>
            <div className={'logo'}>
              <Image
                src='/Sliike.svg'
                alt='sliike Logo'
                width='89px'
                height='47px'
              />
            </div>
            <div>
              <Image
                src='/img/Ellipse.svg'
                alt='sliike Logo'
                width='8px'
                height='8px'
              />
              <span className={'contents'}>
                Are you looking for beauty services and products?
              </span>
            </div>
            <div>
              <Image
                src='/img/Ellipse.svg'
                alt='sliike Logo'
                width='8px'
                height='8px'
              />
              <span className={'contents'}>
                Are you a Beautician looking to sell your services and products?
              </span>
            </div>

            <div className={'formContainer'}>
              <div className={'form'}>
                {success === true ? (
                  <div>
                    <Image
                      src='/img/checked.png'
                      alt='sliike Logo'
                      width='50px'
                      height='50px'
                      className='success-img'
                    />
                    <p className='success-text'>
                      Thank you for sharing your contact details with us! We
                      will keep you informed.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className={'formWriteUp'}>
                      <span className={'writeUpColor'}>Stay connected </span>
                      and recieve a savings of{' '}
                      <span className={'writeUpColor'}>20%</span> on your first
                      transaction when we return
                    </div>
                    <Divider />
                    <br />
                    <div>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <Box>
                          <TextField
                            id='standard-basic'
                            label='Email'
                            variant='standard'
                            sx={{ minWidth: 335 }}
                            {...register('email')}
                            error={!!errors?.email?.message}
                            helperText={errors?.email?.message}
                          />
                        </Box>

                        <Box>
                          <TextField
                            id='standard-basic'
                            label='City'
                            variant='standard'
                            sx={{ minWidth: 335 }}
                            {...register('city')}
                            error={!!errors?.city?.message}
                            helperText={errors?.city?.message}
                          />
                        </Box>
                        <FormControl
                          variant='standard'
                          sx={{ m: 1, minWidth: 335, margin: 0 }}
                          error={!!errors?.persona}
                        >
                          <InputLabel id='demo-simple-select-standard-label'>
                            Persona
                          </InputLabel>
                          <Select
                            labelId='demo-simple-select-standard-label'
                            className='text-align-left'
                            {...register('persona')}
                            error={!!errors?.persona?.message}
                          >
                            <MenuItem value={'client'}>Client/User</MenuItem>
                            <MenuItem value={'beautician'}>Beautician</MenuItem>
                          </Select>
                          {!!errors?.persona && (
                            <FormHelperText>
                              {errors?.persona?.message}
                            </FormHelperText>
                          )}
                        </FormControl>
                        {watchPersona === 'beautician' && (
                          <FormControl
                            variant='standard'
                            sx={{ m: 0.5, minWidth: 335, margin: 0 }}
                            error={!!errors?.type}
                          >
                            <InputLabel id='demo-simple-select-standard-label'>
                              Type
                            </InputLabel>
                            <Select
                              labelId='demo-simple-select-standard-label'
                              className='text-align-left'
                              {...register('type')}
                              error={!!errors?.type?.message}
                            >
                              <MenuItem value={'Independent'}>
                                Independent
                              </MenuItem>
                              <MenuItem value={'Salon Owner'}>
                                Salon Owner
                              </MenuItem>
                            </Select>
                            {!!errors?.type && (
                              <FormHelperText>
                                {errors?.type?.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        )}

                        <FormControl
                          variant='standard'
                          sx={{ m: 1, minWidth: 335, margin: 0 }}
                          error={!!errors?.demography}
                        >
                          <InputLabel id='demo-simple-select-standard-label'>
                            Demography
                          </InputLabel>
                          <Select
                            labelId='demo-simple-select-standard-label'
                            {...register('demography')}
                            error={!!errors?.demography?.message}
                            className='text-align-left'
                          >
                            <MenuItem value={'Afro-Caribbean'}>
                              Afro-Caribbean
                            </MenuItem>
                            <MenuItem value={'Hispanic or Latino'}>
                              Hispanic or Latino
                            </MenuItem>
                            <MenuItem value={'Indian (Indigenous People)'}>
                              Indian (Indigenous People)
                            </MenuItem>
                            <MenuItem value={'Asian (Canadian)'}>
                              Asian (Canadian)
                            </MenuItem>
                            <MenuItem
                              value={'White (Canada – not Hispanic/Latino)'}
                            >
                              White (Canada – not Hispanic/Latino)
                            </MenuItem>
                            <MenuItem
                              value={'Mixed race (Canada – Hispanic/Latino)'}
                            >
                              Mixed race (Canada – Hispanic/Latino)
                            </MenuItem>
                            <MenuItem value={'Prefer not to share'}>
                              Prefer not to share
                            </MenuItem>
                          </Select>
                          {!!errors?.demography?.message && (
                            <FormHelperText>
                              {errors?.demography?.message}
                            </FormHelperText>
                          )}
                        </FormControl>
                        <input
                          type='submit'
                          value='SUBMIT'
                          className={'subBotton'}
                        />
                      </form>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className={'socialMeadiaCon'}>
              <div className={'socialMeadia'}>
                <a>
                  <Image
                    src='/img/Facebooks.svg'
                    alt='sliike Logo'
                    width='35px'
                    height='35px'
                  />
                </a>
                <a>
                  <Image
                    src='/img/Instagram_white.svg'
                    alt='sliike Logo'
                    width='35px'
                    height='35px'
                  />
                </a>
                <a>
                  <Image
                    src='/img/Twitters.svg'
                    alt='sliike Logo'
                    width='35px'
                    height='35px'
                  />
                </a>
                <a>
                  <Image
                    src='/img/TikTok.svg'
                    alt='sliike Logo'
                    width='35px'
                    height='35px'
                  />
                </a>
              </div>
            </div>

            <div className={'emailCon'}>Email:connect@sliike.com</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['landing'])),
  },
});

export default Home;
