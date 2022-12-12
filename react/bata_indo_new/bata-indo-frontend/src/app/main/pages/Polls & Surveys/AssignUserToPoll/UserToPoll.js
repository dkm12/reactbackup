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
// import { saveTravelClaim, newTravelClaim, getTravelClaim } from '../store/empTravelClaimSlice';
// import reducer from '../store';
import SmartForm from '@smart-form';
import masterApi from '@common/utils/masterApi';

const useStyles = makeStyles(theme => ({
    productImageFeaturedStar: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: orange[400],
        opacity: 0
    },
    productImageUpload: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut
    },
    productImageItem: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover': {
            '& $productImageFeaturedStar': {
                opacity: 0.8
            }
        },
        '&.featured': {
            pointerEvents: 'none',
            boxShadow: theme.shadows[3],
            '& $productImageFeaturedStar': {
                opacity: 1
            },
            '&:hover $productImageFeaturedStar': {
                opacity: 1
            }
        }
    }
}));



function UserToPoll(props) {
    const dispatch = useDispatch();
    const uuid = useSelector(({ auth }) => auth.user.uuid);
    const theme = useTheme();

    const classes = useStyles(props);

    const routeParams = useParams();
    const [masterData, setMasterData] = useState({});
    const [loading, setLoading] = useState(false);
    const { pollsurveyId } = routeParams;

    useDeepCompareEffect(() => {
        async function updateProductState() {
            console.log("routeParams", routeParams);

            let locationData = await masterApi.getAlllocations();
            let locationArray = [];
            _.isArray(locationData)
                && locationData.map((d) => (locationArray.push({ value: d.locCode, title: d.locName })));

            let departmentArray = [];
            let departmentData = await masterApi.getAlldepartments();
            _.isArray(departmentData)
                && departmentData.map((d) => (departmentArray.push({ title: d.dptName, value: d.dptCode })));

            let gradeData = await masterApi.getAllgrades();
            let gradeArray = [];
            _.isArray(gradeData)
                && gradeData.map((d) => (gradeArray.push({ value: d.gradeCode, title: d.gradeName })));

            let genderData = await masterApi.getAllGenders();
            let genderArray = [];
            _.isArray(genderData)
                && genderData.map((d) => (genderArray.push({ value: d.genderCode, title: d.genderName })));
            setMasterData(
                {
                    locations: locationArray,
                    departments: departmentArray,
                    grades: gradeArray,
                    genders: genderArray
                }
            );

            if (pollsurveyId === 'new') {
                // dispatch(newTravelClaim({ uuid: uuid }));
            } else {
                // dispatch(getTravelClaim(routeParams));

                setLoading(true);
            }
        }
        updateProductState();
        setLoading(false);
    }, [dispatch, routeParams]);

    let template = {
        layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
        sections: [
            {
                id: 'pollSurvey',
                fields: [{
                    type: 'select',
                    name: 'location',
                    id: 'location',
                    title: 'Location',
                    options: masterData.locations
                }, {
                    type: 'select',
                    name: 'department',
                    id: 'department',
                    title: 'Department',
                    options: masterData.departments
                }, {
                    type: 'select',
                    name: 'grade',
                    id: 'grade',
                    title: 'Grade',
                    options: masterData.grades
                }, {
                    type: 'select',
                    name: 'gender',
                    id: 'gender',
                    title: 'Gender',
                    options: masterData.genders
                }],
            }, {
                title: 'Polls Publish Dates',
                id: 'pollsPublishDates',
                fields: [
                    {
                        type: 'date',
                        name: 'fromDate',
                        id: 'fromDate',
                        title: 'Publish From Date',
                        validationProps: {
                            required: 'This is a mandatory field'
                        }
                    },
                    {
                        type: 'date',
                        name: 'toDate',
                        id: 'toDate',
                        title: 'Publish To Date',
                        validationProps: {
                            required: 'This is a mandatory field'
                        }
                    },
                ]
            },
        ],
    };


    function updateAttachment(objList) {
        //console.log("objList",objList);
        return Promise.all(
            objList.map(async product => {

                if ('location' in product && _.isArray(masterData.locations)) {
                    let locData = masterData.locations.filter(obj => obj.value === product.location);
                    if (_.isArray(locData) && locData.length > 0) {
                        product.locationName = locData[0].title;
                    }
                }

                if ('department' in product && _.isArray(masterData.departments)) {
                    let departmentData = masterData.departments.filter(obj => obj.value === product.department);
                    if (_.isArray(departmentData) && departmentData.length > 0) {
                        product.departmentName = departmentData[0].title;
                    }
                }
                if ('grade' in product && _.isArray(masterData.grades)) {
                    let gradeData = masterData.grades.filter(obj => obj.value === product.grade);
                    if (_.isArray(gradeData) && gradeData.length > 0) {
                        product.gradeName = gradeData[0].title;
                    }
                }
                if ('gender' in product && _.isArray(masterData.genders)) {
                    let genderData = masterData.genders.filter(obj => obj.value === product.gender);
                    if (_.isArray(genderData) && genderData.length > 0) {
                        product.genderName = genderData[0].title;
                    }
                }
                return product;
            })
        );
    }

    async function onSubmit(values) {
        console.log(values);
        if (values.button.toUpperCase() === "SAVE AS DRAFT") {
            let lrData = {};
            let location = await updateAttachment(values.data.location);
            let department = await updateAttachment(values.data.department);
            let grade = await updateAttachment(values.data.grade);
            let gender = await updateAttachment(values.data.gender);

            lrData.location = location;
            lrData.department = department;
            lrData.grade = grade;
            lrData.gender = gender;
            lrData.fromDate = values.data.fromDate;
            lrData.toDate = values.data.toDate;

            console.log("Hi", lrData);

            // if (billTypeId === "new") {
            //     masterApi.saveToMaster({ name: 'bill-type', formData: lrData })
            // }
            // else {
            //     masterApi.updateToMaster({ name: 'bill-type', id: billTypeId, formData: lrData })
            // }


        }
    }

    function onCancel() {
        props.history.push("/app/poll-survey/manage-poll");
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
                                    <span className="mx-4">Poll&Survey List</span>
                                </Typography>
                            </FuseAnimate>

                            <div className="flex items-center max-w-full">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <img
                                        className="w-32 sm:w-48 rounded"
                                        src="app/assets/images/ecommerce/product-image-placeholder.png"

                                    />
                                </FuseAnimate>
                                <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                                    {/* <FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography className="text-16 sm:text-20 truncate">
										{inputList.id === -1 ? "New Claim Request" : "Edit Claim Request"}
											</Typography>
									</FuseAnimate> */}
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography variant="caption">Assign Users to poll</Typography>
                                    </FuseAnimate>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            content={
                <div className="p-16 sm:p-24">
                    <SmartForm
                        //defaultValues={travelClaim}
                        template={template}
                        //watchFields={['']}
                        // validate={validate}
                        onSubmit={onSubmit}
                        onCancel={onCancel}
                        //onChange={data => handleDataChange(data)}
                        buttons={['save as Draft', 'Publish', 'cancel']}
                    />
                </div>
            }
            innerScroll
        />
    );
}

export default UserToPoll;
