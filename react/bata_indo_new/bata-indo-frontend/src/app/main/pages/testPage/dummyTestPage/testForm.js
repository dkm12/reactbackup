import React, { Component, useState, useEffect } from 'react'
import SmartForm from '@smart-form'
import api from '@api/index'
import masterApi from '@common/utils/masterApi'
import _ from '@lodash'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'

function TestForm() {
	const [empCategories, setEmpCategories] = useState([]);
  const [formdata, setFormdata] = useState([]);
// const jpId = 'new';
const today = new Date();
const routeParams = useParams();
const { jpId } = routeParams;
async function onSubmit(val) {
  console.log('dee val', val)
  let postData = { ...val.data, jbdApplyEmpCats: val.data.jbdApplyEmpCats.toString() }
  const response = await axios.post(api.jobs.ijpSave, postData);
  console.log('api res', response)
}

function onCancel(){
console.log("cancil")
}

async function getmasterData() {
  let EmpCatData = await masterApi.getAllActiveEmployeeCategorys();
  console.log('empcatata', EmpCatData)
  const empCatdata = [];
  _.isArray(EmpCatData)
    && EmpCatData.map((d) => (empCatdata.push({ value: d.ecCode, title: d.ecName })));
  setEmpCategories(empCatdata);
}




async function getbyId(){

	const response = await axios.get(api.jobs.ijpGetById + '/' + jpId);
	console.log('edit', response)
	if (response && response.data && response.data.data) {
		setFormdata([...formdata, response.data.data]);
		// setFormdata(response.data.data)
		console.log('FORN EDIT DETA', response.data.data)

}
}

useEffect(() => {
  getmasterData();
  getbyId();

}, [])

	let templateForm = {
  layout: { column: 1, spacing: 2, size: 'medium', label: 'top', type: 'grid' },
  title: 'Test Form',
  description: 'Test Form description',
  sections: [
    {
      layout: { column: 2, spacing: 2, size: 'small', label: 'top' },
      id: 'personal_information',
      fields: [
        {
          type: 'text',
          name: 'jbdTitle',
          id: 'jbdTitle',
          title: 'Job Title',
          disabled: false,
          pattern: {
            value: /^(?=.*[a-zA-Z]).{1,49}$/,
            message: 'Please enter alpha-numeric and below 50 characters'
          },
          validationProps: {
            required: 'This is a mandatory field'
          }
        },

        {
          type: 'textarea',
          name: 'jbdTitle',
          id: 'jbdTitle',
          title: 'Job Title',
          disabled: false,
          pattern: {
            value: /^(?=.*[a-zA-Z]).{1,49}$/,
            message: 'Please enter alpha-numeric and below 50 characters'
          },
          validationProps: {
            required: 'This is a mandatory field'
          }
        },

        {
          type: 'autocomplete',
          name: 'jbdDesigName',
          id: 'jbdDesigName',
          title: 'Designation',
          options: empCategories,
          validationProps: {
            required: 'This is a mandatory field'
          }
        },


        {
          type: 'checkbox',
          name: 'include_portfolio',
          id: 'include_portfolio',
          title: 'Include Portfolio Links'
        },
        {
          type: 'checkbox',
          name: 'include_social',
          id: 'include_social',
          title: 'Include Social Media Links',
          value:'asd'
        },

        {
          type: 'radio',
          name: 'gender',
          id: 'gender',
          title: 'Gender',
          options: [
            { title: 'Male', value: 'male' },
            { title: 'Female', value: 'female' }
          ]
        },

     
        {
          type: 'multiSelect',
          name: 'jbdApplyEmpCats',
          id: 'jbdApplyEmpCats',
          title: 'Employee Category',
          options: empCategories,
          validationProps: {
            required: 'This is a mandatory field'
          }

        },

{ 
        type: 'date',
        name: 'jbdPubFrmDate',
        id: 'jbdPubFrmDate',
        title: 'Publis from date',
        min: (jpId == 'new') && today,
        validationProps: {
          required: "This is a mandatory field",
          validate: [
            {
              condition: "jbdPubFrmDate <= jbdPubToDate",
              message: "From date should be less than or equal to till date."
            }
          ],
          manual: [
            {
              condition: (jpId == 'new') ? `jbdPubFrmDate >= today` : `jbdPubFrmDate != jbdPubFrmDate`,
              message: (jpId == 'new') ? "From Date should be more than or equal to today's date." : "This is a mandatory field"
            }
          ]

        }
      },

      {
        type: 'date',
        name: 'jbdPubToDate',
        id: 'jbdPubToDate',
        title: 'Publish end date',
        min: today,
        validationProps: {
          required: "This is a mandatory field",
          validate: [
            {
              condition: "jbdPubToDate >= jbdPubFrmDate",
              message: "From date should be less than or equal to till date."
            }
          ],
          manual: [
            {
              condition: (jpId == 'new') ? `jbdPubToDate >= today` : `jbdPubToDate != jbdPubToDate`,
              message: (jpId == 'new') ? "Till date should be more than or equal to today's date." : "This is a mandatory field"
            }
          ]
        }
      },





      ]


      
    },

    {
      title: 'Array',
      id: 'array',
      layout: { column: 1, spacing: 2, size: 'small', label: 'fixed' },
      fields: [
        {
          type: 'array',
          name: 'test',
          id: 'array',
          title: 'Array',
          layout: { column: 6, spacing: 2, size: 'small', label: 'blank', type: 'table' },
          columns: ['Name', 'Address', 'Mobile', 'From Date', 'To Date', 'Address', 'New File'],
          subFields: [
            {
              type: 'text',
              name: 'name',
              id: 'name',
              title: 'Name',
            },
            {
              type: 'text',
              name: 'address',
              id: 'address',
              title: 'Address',
            },
            {
              type: 'number',
              name: 'mobile',
              id: 'mobile',
              title: 'Mobile',
            },
            {
              type: 'date',
              name: 'fromdate',
              id: 'fromdate',
              title: 'From Date',
            },
            {
              type: 'section',
              layout: { column: 1, spacing: 2, size: 'small', label: 'normal' },
              fields: [
                {
                  type: 'number',
                  name: 'tollAmount',
                  id: 'tollAmount',
                  title: 'Toll Amount'
                },
                {
                  type: 'number',
                  name: 'parking',
                  id: 'parking',
                  title: 'Parking'
                },
                {
                  type: 'number',
                  name: 'food',
                  id: 'food',
                  title: 'Food'
                }
              ]
            },
            {
              type: 'section',
              layout: { column: 1, spacing: 2, size: 'small', label: 'normal' },
              fields: [
                {
                  type: 'file',
                  name: 'tollAmountFile',
                  id: 'tollAmountFile',
                  title: 'Toll Amount'
                },
                {
                  type: 'file',
                  name: 'parkingFile',
                  id: 'parkingFile',
                  title: 'Parking'
                },
                {
                  type: 'file',
                  name: 'foodFile',
                  id: 'foodFile',
                  title: 'Food'
                }
              ]
            },
            {
              type: 'section',
              layout: { column: 1, spacing: 2, size: 'small', label: 'normal' },
              fields: [
                {
                  type: 'number',
                  name: 'tab1',
                  id: 'tab1',
                  title: 'AMT 1'
                },
                {
                  type: 'number',
                  name: 'tab2',
                  id: 'tab2',
                  title: 'AMT 2'
                },
                {
                  type: 'number',
                  name: 'total',
                  id: 'total',
                  title: 'total',
                  calculation: {
                    type: 'add',
                    from: ['this*tab1', 'this*tab2']
                  }
                },
              ]
            },
          ]
        }
      ]
    },

  ]
}



return(
<>
{
						(jpId != "new" && formdata.length > 0) &&
						<SmartForm
							defaultValues={formdata[0]}
							template={templateForm}
							// watchFields={['firstname', 'include_portfolio', 'email', 'country']}
							// validate={validate}
							onSubmit={onSubmit}
							onCancel={onCancel}
							buttons={['submit',  'cancel']}
						/>}
					{
						(jpId == "new") &&
						<SmartForm

							template={templateForm}
							// watchFields={['firstname', 'include_portfolio', 'email', 'country']}
							// validate={validate}
							onSubmit={onSubmit}
							onCancel={onCancel}
							buttons={['submit',  'cancel']}
						/>
					}

</>
)

}

export default TestForm