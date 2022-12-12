import FuseAnimate from '@core/core/Animate';
import FuseLoading from '@core/core/Loading';
import FusePageCarded from '@core/core/PageCarded';
import { useForm, useDeepCompareEffect } from '@core/hooks';
import FusePageSimple from '@core/core/PageSimple';
import FuseUtils from '@core/utils';
import _ from '@lodash';
import { orange } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import SmartForm from '@smart-form';
import masterApi from '@common/utils/masterApi';
import pollSurveyApi from '../store/pollSurveyApi';
import { showMessage } from 'app/store/core/messageSlice';
import { Label, GetLabel } from '@common/utils/label';
import { regex } from 'app/auth';

function CreatePoll(props) {
    const routeParams = useParams();
    const dispatch = useDispatch();
    const uuid = useSelector(({ auth }) => auth.user.uuid);
    const theme = useTheme();
    const [deptdata, setDept] = useState([]);
    const [genderdata, setGender] = useState([]);
    const [locdata, setLoc] = useState([]);
    const [gradedata, setGrade] = useState([]);
    const [formData, setForm] = useState();
    const [editformData, setEditForm] = useState();
    const { sID } = routeParams;
    const { type } = routeParams;
    const today = new Date();

    useEffect(() => {
        async function getMaster() {

            let locList = await masterApi.getAllActiveCities();
            const temp = [];
            _.isArray(locList)
                && locList.map((d) => (temp.push({ value: d.cityCode, title: d.cityName })));
            setLoc(temp);

            let dptList = await masterApi.getAllActivedepartments();
            const temp1 = [];
            _.isArray(dptList)
                && dptList.map((d) => (temp1.push({ value: d.dptCode, title: d.dptName })));
            setDept(temp1);

            let genderData = await masterApi.getAllActiveGenders();
            const temp2 = [];
            _.isArray(genderData)
                && genderData.map((d) => (temp2.push({ value: d.genderCode, title: d.genderName })));
            setGender(temp2);

            let gradeList = await masterApi.getAllActiveEmployeeCategorys();
            const temp3 = [];
            _.isArray(gradeList)
                && gradeList.map((d) => (temp3.push({ value: d.ecCode, title: d.ecName })));
            setGrade(temp3);
        }

        getMaster();
        if (sID != 'new') {
            async function fetchFormData() {
                let pageData = await pollSurveyApi.getById(sID);
                console.log(pageData.data)
                setForm(pageData.data);
                if (type == 'editable') {
                    setEditForm({
                        'title': pageData.data.title,
                        'question': pageData.data.question,
                        'description': pageData.data.description,
                        'categorys': pageData.data.categorys,
                        'departments': pageData.data.departments,
                        'locations': pageData.data.locations,
                        'publishedFromDate': pageData.data.publishedFromDate,
                        'publishedToDate': pageData.data.publishedToDate,
                        'genders': pageData.data.genders,
                        'surveyOptions1': (pageData.data.surveyOptions && pageData.data.surveyOptions && pageData.data.surveyOptions[0] && pageData.data.surveyOptions[0].surveyOptDesc) ? pageData.data.surveyOptions[0].surveyOptDesc : '',
                        'surveyOptions2': (pageData.data.surveyOptions && pageData.data.surveyOptions && pageData.data.surveyOptions[1] && pageData.data.surveyOptions[1].surveyOptDesc) ? pageData.data.surveyOptions[1].surveyOptDesc : '',
                        'surveyOptions3': (pageData.data.surveyOptions && pageData.data.surveyOptions && pageData.data.surveyOptions[2] && pageData.data.surveyOptions[2].surveyOptDesc) ? pageData.data.surveyOptions[2].surveyOptDesc : '',
                        'surveyOptions4': (pageData.data.surveyOptions && pageData.data.surveyOptions && pageData.data.surveyOptions[3] && pageData.data.surveyOptions[3].surveyOptDesc) ? pageData.data.surveyOptions[3].surveyOptDesc : '',
                    })
                }
            }
            fetchFormData();
        }
    }, [dispatch]);

    let template = {
        layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
        sections: [
            {
                id: 'pollSurvey',
                fields: [
                    {
                        type: 'text',
                        id: 'title',
                        name: 'title',
                        disabled: (sID != 'new' && type != 'editable'),
                        title: GetLabel('BL00054'),
                        // title: 'Title',
                        pattern: {
                            value: regex.maxSize50,
                            message: 'Please enter correct format and below 50 characters'
                        },
                        validationProps: {
                            required: 'This is a mandatory field',
                        }
                    },
                    {
                        type: 'text',
                        id: 'description',
                        name: 'description',
                        disabled: (sID != 'new' && type != 'editable'),
                        title: GetLabel('BL00055'),
                        // title: 'Description',
                        pattern: {
                            value: regex.maxSize50,
                            message: 'Please enter correct format and below 50 characters'
                        },
                        validationProps: {
                            required: 'This is a mandatory field',
                        }
                    },
                    {
                        type: 'text',
                        id: 'question',
                        name: 'question',
                        disabled: (sID != 'new' && type != 'editable'),
                        title: GetLabel('BL00396'),
                        // title: 'Question',
                        pattern: {
                            value: regex.maxSize250,
                            message: 'Please enter correct format and below 250 characters'
                        },
                        validationProps: {
                            required: 'This is a mandatory field',
                        }
                    },
                    // {
                    //     type: 'array',
                    //     name: 'surveyOptions',
                    //     id: 'surveyOptions',
                    //     layout: { column: 1, spacing: 2, size: 'small', label: 'blank', type: 'table' },
                    //     columns: ['Options'],
                    //     subFields: [
                    //         {
                    //             type: 'text',
                    //             name: 'surveyOptDesc',
                    //             id: 'surveyOptDesc',
                    //             title: 'Options',
                    //             validationProps: {
                    //                 required: 'This is a mandatory field',
                    //             }
                    //         },
                    //     ]
                    // }
                ],
            },
            {
                layout: { column: 4, spacing: 2, size: 'medium', label: 'fixed' },
                title: (sID == 'new' || type == 'editable') && GetLabel('BL00397'),
                id: 'options',
                fields: [
                    {
                        type: (sID == 'new' || type == 'editable') ? 'text' : 'hidden',
                        id: 'surveyOptions1',
                        name: 'surveyOptions1',
                        title: GetLabel('BL00398'),
                        // title: 'Option1',
                        pattern: {
                            value: regex.maxSize50AllowNum,
                            message: 'Please enter correct format and below 50 characters'
                        },
                        validationProps: {
                            required: 'This is a mandatory field',
                        }
                    },
                    {
                        type: (sID == 'new' || type == 'editable') ? 'text' : 'hidden',
                        id: 'surveyOptions2',
                        name: 'surveyOptions2',
                        title: GetLabel('BL00399'),
                        // title: 'Option2',
                        pattern: {
                            value: regex.maxSize50AllowNum,
                            message: 'Please enter correct format and below 50 characters'
                        },
                        validationProps: {
                            required: 'This is a mandatory field',
                        }
                    },
                    {
                        type: (sID == 'new' || type == 'editable') ? 'text' : 'hidden',
                        id: 'surveyOptions3',
                        name: 'surveyOptions3',
                        title: GetLabel('BL00400'),
                        // title: 'Option3',
                        pattern: {
                            value: regex.maxSize50AllowNum,
                            message: 'Please enter correct format and below 50 characters'
                        },
                    },
                    {
                        type: (sID == 'new' || type == 'editable') ? 'text' : 'hidden',
                        id: 'surveyOptions4',
                        name: 'surveyOptions4',
                        title: GetLabel('BL00401'),
                        title: 'Option4',
                        pattern: {
                            value: regex.maxSize50AllowNum,
                            message: 'Please enter correct format and below 50 characters'
                        },
                    },
                ],
            },
            {
                layout: { column: 4, spacing: 2, size: 'medium', label: 'fixed' },
                title: GetLabel('BL00404'),
                id: 'assign_user_role',
                fields: [
                    {
                        type: 'multiSelect',
                        id: 'locations',
                        name: 'locations',
                        disabled: (sID != 'new' && type != 'editable'),
                        options: locdata,
                        title: GetLabel('BL00074')
                    },
                    {
                        type: 'multiSelect',
                        id: 'departments',
                        name: 'departments',
                        disabled: (sID != 'new' && type != 'editable'),
                        options: deptdata,
                        title: GetLabel('BL00073')
                    },
                    {
                        type: 'multiSelect',
                        id: 'categorys',
                        name: 'categorys',
                        disabled: (sID != 'new' && type != 'editable'),
                        options: gradedata,
                        title: GetLabel('BL00265'),
                    },
                    {
                        type: 'multiSelect',
                        id: 'genders',
                        name: 'genders',
                        disabled: (sID != 'new' && type != 'editable'),
                        options: genderdata,
                        title: GetLabel('BL00281'),
                    },
                ],
            },
            {
                layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
                title: (sID == 'new' || type == 'editable') && GetLabel('BL00402'),
                id: 'publish_date',
                fields: [
                    {
                        type: (sID == 'new' || type == 'editable') ? 'date' : 'hidden',
                        id: 'publishedFromDate',
                        name: 'publishedFromDate',
                        title: GetLabel('BL00076'),
                        min: (sID == 'new') && today,
                        validationProps: {
                            required: "This is a mandatory field",
                            validate: [
                                {
                                    condition: "publishedFromDate <= publishedToDate",
                                    message: "From date should be less than or equal to to date."
                                }
                            ],
                            manual: [
                                {
                                    condition: `publishedFromDate >= today`,
                                    message: "From Date should be more than or equal to today's date."
                                }
                            ]
                        }
                    },
                    {
                        type: (sID == 'new' || type == 'editable') ? 'date' : 'hidden',
                        id: 'publishedToDate',
                        name: 'publishedToDate',
                        title: GetLabel('BL00077'),
                        min: today,
                        validationProps: {
                            required: "This is a mandatory field",
                            validate: [
                                {
                                    condition: "publishedToDate >= publishedFromDate",
                                    message: "From date should be less than or equal to to date."
                                }
                            ],
                            manual: [
                                {
                                    condition: `publishedToDate >= today`,
                                    message: "Till date should be more than or equal to today's date."
                                }
                            ]
                        }
                    },
                ],
            }
        ],
    };
    let template2 = {
        layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
        sections: [
            {
                layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
                title: GetLabel('BL00402'),
                id: 'publish_date2',
                fields: [
                    {
                        type: 'date',
                        id: 'publishedFromDate',
                        name: 'publishedFromDate',
                        title: GetLabel('BL00076'),
                        validationProps: {
                            required: "This is a mandatory field",
                            validate: [
                                {
                                    condition: "publishedFromDate <= publishedToDate",
                                    message: "From date should be less than or equal to to date."
                                }
                            ]
                        }
                    },
                    {
                        type: 'date',
                        id: 'publishedToDate',
                        name: 'publishedToDate',
                        title: GetLabel('BL00077'),
                        min: today,
                        validationProps: {
                            required: "This is a mandatory field",
                            validate: [
                                {
                                    condition: "publishedToDate >= publishedFromDate",
                                    message: "From date should be less than or equal to to date."
                                }
                            ],
                            manual: [
                                {
                                    condition: `publishedToDate >= today`,
                                    message: "Publish to date should be more than or equal to today's date."
                                }
                            ]
                        }
                    },
                ],
            }
        ],
    };
    async function onUpdate(val) {
        let tempOption = [];
        tempOption.push({ optionId: formData.surveyOptions[0].optionId, surveyId: formData.surveyOptions[0].surveyId, surveyOptDesc: val.data.surveyOptions1 })
        tempOption.push({ optionId: formData.surveyOptions[1].optionId, surveyId: formData.surveyOptions[1].surveyId, surveyOptDesc: val.data.surveyOptions2 })
        tempOption.push({ optionId: formData.surveyOptions[2].optionId, surveyId: formData.surveyOptions[2].surveyId, surveyOptDesc: val.data.surveyOptions3 })
        tempOption.push({ optionId: formData.surveyOptions[3].optionId, surveyId: formData.surveyOptions[3].surveyId, surveyOptDesc: val.data.surveyOptions4 })
        
        let temp = {
            "surveyId": formData.surveyId,
            "title": (type == 'editable') ? val.data.title : formData.title,
            "description": (type == 'editable') ? val.data.description : formData.description,
            "question": (type == 'editable') ? val.data.question : formData.question,
            "locations": (type == 'editable') ? (_.isArray(val.data.locations) ? val.data.locations.join(",") : val.data.locations) : formData.locations,
            "genders": (type == 'editable') ? (_.isArray(val.data.genders) ? val.data.genders.join(",") : val.data.genders) : formData.genders,
            "departments": (type == 'editable') ? (_.isArray(val.data.departments) ? val.data.departments.join(",") : val.data.departments) : formData.departments,
            "categorys": (type == 'editable') ? (_.isArray(val.data.categorys) ? val.data.categorys.join(",") : val.data.categorys) : formData.categorys,
            "status": (val.button.toUpperCase() === "PUBLISH") ? 'Published' : formData.status,
            "publishedFromDate": (type == 'editable') ? val.data.publishedFromDate : val.data.publishedFromDate,
            "publishedToDate": (type == 'editable') ? val.data.publishedToDate : val.data.publishedToDate,
            "surveyOptions": (type == 'editable') ? tempOption : formData.surveyOptions
        }
        console.log(temp)
        let res = await pollSurveyApi.updateById(formData.surveyId, temp);
        if (res.status == '200') {
            if (val.button.toUpperCase() === "PUBLISH") {
                let postData = {
                    'surveyStatus': "Published"
                }
                let res = await pollSurveyApi.updateStatusById(formData.surveyId, postData);
                console.log(res);
                if (res.status == '200') {
                    await dispatch(showMessage({ message: res.message, variant: 'success' }));
                    props.history.push("/app/poll-survey/PollMaster");
                }
                else dispatch(showMessage({ message: res.message, variant: 'error' }));
            }
            else {
                dispatch(showMessage({ message: res.message, variant: 'success' }));
                props.history.push("/app/poll-survey/PollMaster");
            }
        }
        else {
            dispatch(showMessage({ message: res.message, variant: 'error' }));
        }
        // }
        // console.log(formUpdateData)
    }

    async function onSubmit(values) {
        if (values.button.toUpperCase() === "SAVE") {
            let tempData = {};
            tempData.title = values.data.title
            tempData.description = values.data.description
            tempData.question = values.data.question
            tempData.surveyOptions = [];
            tempData.surveyOptions.push({ "surveyOptDesc": values.data.surveyOptions1 })
            tempData.surveyOptions.push({ "surveyOptDesc": values.data.surveyOptions2 })
            tempData.surveyOptions.push({ "surveyOptDesc": values.data.surveyOptions3 })
            tempData.surveyOptions.push({ "surveyOptDesc": values.data.surveyOptions4 })
            tempData.locations = (values.data.locations) ? values.data.locations.join(",") : ''
            tempData.departments = (values.data.departments) ? values.data.departments.join(",") : ''
            tempData.categorys = (values.data.categorys) ? values.data.categorys.join(",") : ''
            tempData.genders = (values.data.genders) ? values.data.genders.join(",") : ''
            tempData.publishedFromDate = values.data.publishedFromDate
            tempData.publishedToDate = values.data.publishedToDate
            let res = await pollSurveyApi.save(tempData);
            if (res.status == '200') {
                dispatch(showMessage({ message: res.message, variant: 'success' }));
                props.history.push("/app/poll-survey/PollMaster");
            }
            else {
                dispatch(showMessage({ message: res.message, variant: 'error' }));
            }
        }
    }

    function onCancel() {
        props.history.push("/app/poll-survey/PollMaster");
    }

    return (
        <FusePageSimple
            classes={{
                toolbar: 'px-16 sm:px-24'
            }}
            header={
                (
                    <div className="flex flex-1 w-full items-center justify-between">
                        <div className="flex flex-col items-start max-w-full">
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Typography
                                    className="normal-case flex items-center sm:mb-12"
                                    component={Link}
                                    role="button"
                                    to="/app/poll-survey/PollMaster"
                                    color="inherit"
                                >
                                    <Icon className="text-20">
                                        {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
                                    </Icon>
                                    <span className="mx-4">Polls & Surveys Master List</span>
                                </Typography>
                            </FuseAnimate>

                            <div className="flex items-center max-w-full">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <img
                                        className="w-32 sm:w-48 rounded"
                                        src="assets/images/ecommerce/product-image-placeholder.png"
                                    //alt={form.name}
                                    />
                                </FuseAnimate>
                                <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography className="text-16 sm:text-20 truncate">
                                            {/* {leaveRequest && leaveRequest.id !== null ? "Edit Leave Request" : "New Leave Request"} */}
                                            <Label labelId="BL00031" />
                                        </Typography>
                                    </FuseAnimate>
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography variant="caption">

                                            {/* {leaveRequest && leaveRequest.id !== null ? "Edit Leave Request" : "New Leave Request"} */}
                                            {sID == 'new' ? <Label labelId="BL00403" /> : <Label labelId="BL00405" />}
                                        </Typography>
                                    </FuseAnimate>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            content={
                <div className="p-16 sm:p-24">
                    {(sID == 'new') && <SmartForm
                        template={template}
                        onSubmit={onSubmit}
                        onCancel={onCancel}
                        buttons={['save', 'cancel']}
                    />}
                    {(sID != 'new' && type == 'editable' && editformData) && <SmartForm
                        defaultValues={editformData}
                        template={template}
                        onSubmit={onUpdate}
                        onCancel={onCancel}
                        buttons={['publish', 'update', 'cancel']}
                    />}
                    {(sID != 'new' && type != 'editable' && formData) &&
                        <>
                            <SmartForm
                                defaultValues={formData}
                                template={template}
                            />
                            <SmartForm
                                defaultValues={formData}
                                template={template2}
                                onSubmit={onUpdate}
                                onCancel={onCancel}
                                buttons={(formData.status.toUpperCase() == 'Expired') ? ['Re-Publish'] : ['Publish', 'cancel']}
                            />
                        </>
                    }
                </div>
            }
        />
    );
}

export default CreatePoll;
