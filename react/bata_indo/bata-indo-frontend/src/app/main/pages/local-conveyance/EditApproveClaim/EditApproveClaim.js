import FuseAnimate from '@core/core/Animate';
import FuseLoading from '@core/core/Loading';
import FusePageSimple from '@core/core/PageSimple';
import { useForm, useDeepCompareEffect } from '@core/hooks';
import _ from '@lodash';
import { orange } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import SmartForm from '@smart-form';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getApproveClaim, getNextApprover, saveApproveClaim } from '../store/empApproveClaimSlice';
import reducer from '../store';
import History from '@components/History';
import { getLocalClaimHistorys, selectLocalClaimHistorys } from '../store/empLocalClaimHistorysSlice';
import { Label, GetLabel } from '@common/utils/label';

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

function EditApproveClaim(props) {
    const dispatch = useDispatch();
    const uuid = useSelector(({ auth }) => auth.user.uuid);
    const userName = useSelector(({ auth }) => auth.user.name);
    const localConveyance = useSelector(({ localConveyance }) => localConveyance.empApproveClaim);
    const theme = useTheme();
    const [loading, setLoading] = useState(false);

    const localClaimHistorys = useSelector(selectLocalClaimHistorys);
    console.log("LocalClaimHistorys", localClaimHistorys);

    const classes = useStyles(props);
    const routeParams = useParams();

    useEffect(() => {
        setLoading(false);
    }, [localConveyance]);
    useDeepCompareEffect(() => {
        function updateProductState() {
            const { localConveyanceId } = routeParams;
            let params = {
                localConveyanceId: localConveyanceId,
                uuid: uuid
            }
            dispatch(getApproveClaim(params));
            dispatch(getLocalClaimHistorys(params));
            setLoading(true);
        }
        updateProductState();
        setLoading(false);
    }, [dispatch, routeParams]);

    let template = {
        layout: { column: 2, spacing: 2, size: 'small', label: 'fixed' },
        sections: [
            {
                layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
                fields: [
                    {
                        type: 'text',
                        name: 'fullname',
                        id: 'fullname',
                        title: GetLabel('BL00184'),
                        disabled: true
                    },
                    {
                        type: 'text',
                        name: 'createdBy',
                        id: 'createdBy',
                        title: GetLabel('BL00185'),
                        disabled: true
                    },
                    {
                        type: 'text',
                        name: 'department',
                        id: 'department',
                        title: GetLabel('BL00167'),
                        disabled: true
                    },
                    {
                        type: 'text',
                        name: 'designation',
                        id: 'designation',
                        title: GetLabel('BL00166'),
                        disabled: true
                    },
                    {
                        type: 'number',
                        name: 'totalAmt',
                        id: 'totalAmt',
                        title: GetLabel('BL00186'),
                        disabled: true
                    },
                    {
                        type: 'text',
                        name: 'trxNo',
                        id: 'trxNo',
                        title: GetLabel('BL00187'),
                        disabled: true
                    },
                    {
                        type: 'text',
                        name: 'statusCode',
                        id: 'statusCode',
                        title: GetLabel('BL00188'),
                        disabled: true
                    }
                ]
            },
            {
                layout: { column: 1, spacing: 2, size: 'small', label: 'fixed' },
                fields: [
                    {
                        type: 'table',
                        name: 'convyDtlList',
                        id: 'convyDtlList',
                        columns: {
                            ids: ['trvlPurpose', 'fromLoc', 'toLoc', 'trvlFromDate', 'trvlToDate', 'modeOfTravel', 'modAttachment', 'billAmt', 'parkingAmount', 'parkingAttachment', 'foodMeal', 'foodMealAmount', 'tollAmount', 'tollAttachment'],
                            // titles: ['Travel Purpose', 'Form Location', 'To Location', 'Travel From Date', 'Travel To Date', 'Mode Of Travel', 'Mode of Attachment ', 'Bill Amount', 'Parking Amount', 'Parking Attachment', 'Food/Meal', 'FoodAmont ', 'Total Amount', 'Total Attachment '],
                            titles: GetLabel(['BL00102', 'BL00103', 'BL00104', 'BL00105', 'BL00106', 'BL00107', 'BL00180', 'BL00221', 'BL00111', 'BL00181', 'BL00112', 'BL00182', 'BL00139', 'BL00183']),

                        }
                    }

                ]
            },
            {
                type: 'section',
                layout: { column: 2, spacing: 2, size: 'small', label: 'fixed' },
                fields: [
                    {
                        type: 'text',
                        name: 'empRemark',
                        id: 'empRemark',
                        title: GetLabel('BL00140'),
                        disabled: true
                    },
                    {
                        type: 'number',
                        name: 'totalAmt',
                        id: 'totalAmt',
                        title: GetLabel('BL00186'),
                        disabled: true,
                        calculation: {
                            type: 'add',
                            from: ['convyDtlList*tollAmount']
                        }
                    },
                ]
            },
            {
                title: GetLabel('BL00189'),
                id: 'nextApproverTable',
                fields: [
                    {
                        type: 'select',
                        name: 'pendingWith',
                        id: 'pendingWith',
                        title: GetLabel('BL00189'),
                        options: _.isArray(localConveyance.nextApprover) ? localConveyance.nextApprover : [],
                        validationProps: {
                            required: 'This is a mandatory field'
                        },
                        unregister: ['reject', 'return']
                    },
                    {
                        type: 'textarea',
                        name: 'approverRemarks',
                        id: 'approverRemarks',
                        title: GetLabel('BL00140'),
                        maxlength: 151,
                        validationProps: {
                            required: 'This is a mandatory field',
                            maxLength: {
                                value: 150,
                                message: 'Maximum 150 characters are allowed.'
                            }
                        }
                    }
                ]
            },
        ]
    }
    console.log("template.sections[3]", template.sections[3]);
    if (localConveyance && 'nextApprover' in localConveyance
        && localConveyance.statusCode.toUpperCase() === "PENDING_WITH_FINANCE_DIR"
        && _.isArray(localConveyance.nextApprover)
        && localConveyance.nextApprover.length === 0) {
        delete template.sections[3].fields[0];
    }
    if (localConveyance && 'statusCode' in localConveyance && localConveyance.statusCode.toUpperCase() === "PENDING_WITH_PRESIDENT_DIR") {
        delete template.sections[3].fields[0];
    }

    function onSubmit(values) {
        console.log("values", values);
        if (values.button.toUpperCase() === "ACCEPT") {
            let lrData = {};

            lrData.trxNo = values.data.trxNo;
            lrData.approverId = uuid;

            if (values.data.statusCode.toUpperCase() == "PENDING_WITH_HOD".toUpperCase()
                || values.data.statusCode.toUpperCase() == "PENDING_WITH_FINANCE_ONE".toUpperCase()
                || (values.data.statusCode.toUpperCase() == "PENDING_WITH_FINANCE_DIR".toUpperCase()
                    && values.data.totalAmt >= 100000)
                || values.data.statusCode.toUpperCase() == "PENDING_WITH_PRESIDENT_DIR".toUpperCase()
            ) {
                lrData.pendingWith = values.data.pendingWith;
            }

            lrData.currentStatus = values.data.statusCode;
            lrData.outcome = "FORWARD";
            lrData.remarks = values.data.approverRemarks;
            console.log("data", lrData);
            dispatch(saveApproveClaim(lrData));
            setLoading(true);

        }
        if (values.button.toUpperCase() === "REJECT") {
            let lrData = {};
            lrData.trxNo = values.data.trxNo;
            lrData.approverId = uuid;

            if (values.data.statusCode.toUpperCase() == "PENDING_WITH_HOD".toUpperCase()
                || values.data.statusCode.toUpperCase() == "PENDING_WITH_FINANCE_ONE".toUpperCase()
                || (values.data.statusCode.toUpperCase() == "PENDING_WITH_FINANCE_DIR".toUpperCase()
                    && values.data.totalAmt >= 100000)
            ) {
                lrData.pendingWith = values.data.pendingWith;
            }

            lrData.currentStatus = values.data.statusCode;
            lrData.outcome = "REJECT";
            lrData.remarks = values.data.approverRemarks;
            console.log("data", lrData);
            dispatch(saveApproveClaim(lrData));
            setLoading(true);
        }
        if (values.button.toUpperCase() === "RETURN") {
            let lrData = {};
            lrData.trxNo = values.data.trxNo;
            values.data.approverId = uuid;

            if (values.data.statusCode.toUpperCase() == "PENDING_WITH_HOD".toUpperCase()
                || values.data.statusCode.toUpperCase() == "PENDING_WITH_FINANCE_ONE".toUpperCase()
                || (values.data.statusCode.toUpperCase() == "PENDING_WITH_FINANCE_DIR".toUpperCase()
                    && values.data.totalAmt >= 100000)
            ) {
                lrData.pendingWith = values.data.pendingWith;
            }

            lrData.currentStatus = values.data.statusCode;
            lrData.outcome = "RETURN";
            lrData.remarks = values.data.approverRemarks;
            console.log("data", lrData);
            dispatch(saveApproveClaim(lrData));
            setLoading(true);
        }
    }
    function onCancel() {
        props.history.push("/app/employee-service/approve-local-claim");
    }

    return (
        (loading || (localConveyance && 'lcId' in localConveyance && routeParams.localConveyanceId.toString() !== localConveyance.lcId.toString())) ?
            <FuseLoading />
            :
            <FusePageSimple
                classes={{
                    toolbar: 'p-0',
                    header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
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
                                        to="/app/employee-service/approve-local-claim"
                                        color="inherit"
                                    >
                                        <Icon className="text-20">
                                            {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
                                        </Icon>
                                        <span className="mx-4"><Label labelId="BL00040" /></span>
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <FuseAnimate animation="transition.expandIn" delay={300}>
                                        <img
                                            className="w-32 sm:w-48 rounded"
                                            src="assets/images/ecommerce/product-image-placeholder.png"
                                        // alt={form.name}
                                        />
                                    </FuseAnimate>
                                    <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                <Label labelId="BL00174" />
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption"> <Label labelId="BL00174" /></Typography>
                                        </FuseAnimate>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-1 justify-end px-12">
                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                    <Typography variant="caption">
                                        {localConveyance && localConveyance.lcId !== null && localClaimHistorys && _.isArray(localClaimHistorys) ? <History data={localClaimHistorys} /> : ""}
                                    </Typography>
                                </FuseAnimate>
                            </div>
                        </div>
                    )
                }
                content={
                    <>
                        {localConveyance && localConveyance.lcId && (
                            < div className="p-16 sm:p-24" >
                                <SmartForm
                                    defaultValues={localConveyance}
                                    template={template}
                                    // watchFields={['firstname', 'include_portfolio', 'email', 'country']}
                                    // validate={validate}
                                    onSubmit={onSubmit}
                                    onCancel={onCancel}
                                    // onChange={data => handleDataChange(data)}
                                    buttons={['accept', 'reject', 'return', 'cancel']}
                                />
                            </div >
                        )}
                        {/* <br />
                        <LocalClaimHistoryTable /> */}

                    </>

                }
            //innerScroll
            />
    );
}

export default withReducer('localConveyance', reducer)(EditApproveClaim);

