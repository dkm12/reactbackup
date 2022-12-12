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
// import { saveBanner, newBanner, getBanner } from '../store/bannerSaveSlice';
import { getQuickLink, saveQuickLink, newQuickLink } from '../Store/quickLinkSaveSlice'
import uploadDoc from '@common/utils/uploadDoc';
import SmartForm from '@smart-form';
import { Label, GetLabel } from '@common/utils/label';
import { regex } from 'app/auth';


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



function BillType(props) {
    const dispatch = useDispatch();
    const uuid = useSelector(({ auth }) => auth.user.uuid);
    const quickLink = useSelector(({ quickLink }) => quickLink.quickLinkSave);
    const [loading, setLoading] = useState(false);

    const theme = useTheme();

    const classes = useStyles(props);
    const routeParams = useParams();
    const { quickLinksId } = routeParams;

    useEffect(() => {
        setLoading(false);
    }, [quickLink]);


    useDeepCompareEffect(() => {
        async function updateProductState() {
            if (quickLinksId === 'new') {
                dispatch(newQuickLink());
            }
            else {
                dispatch(getQuickLink(routeParams));
                setLoading(true);
            }
        }
        updateProductState();
        setLoading(false);
    }, [dispatch, routeParams]);

    let template = {
        layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed', type: 'grid' },
        sections: [
            {
                layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
                id: "form",
                fields: [
                    {
                        type: 'text',
                        name: 'quickLinksTitle',
                        id: 'quickLinksTitle',
                        title: GetLabel('BL00054'),
                        disabled: false,
                        pattern: {
                            value: regex.maxSize30,
                            message: 'Please enter alpha-numeric and below 30 characters'
                        },
                        validationProps: {
                            required: 'This is a mandatory field',
                        }
                    },

                    {
                        type: 'text',
                        name: 'quickLinksUrl',
                        id: 'quickLinksUrl',
                        title: 'URL',
                        pattern: {
                            value: regex.urlReg,
                            message: 'Please enter URL format and below 50 characters'
                        },
                        validationProps: {
                            required: 'This is a mandatory field',
                        }
                    },
                    {
                        type: 'radio',
                        id: 'status',
                        name: 'status',
                        title: GetLabel('BL00194'),
                        options: [
                            { title: GetLabel('BL00314'), value: 'ACTIVE' },
                            { title: GetLabel('BL00315'), value: 'INACTIVE' }
                        ],
                        validationProps: {
                            required: 'This is a mandatory field'
                        },
                    }
                ]
            }

        ]
    };

    function onSubmit(values) {

        let { ...rest } = values.data;
        if (quickLink && quickLink.quickLinksId && quickLinksId !== 'new') {
            dispatch(saveQuickLink({ type: "update", data: { ...values.data, quickLinksId: quickLink.quickLinksId } }));
            setLoading(true);
        } else {
            dispatch(saveQuickLink({ type: "save", data: { ...rest } }))
            setLoading(true);
        }
    }



    function onCancel() {
        props.history.push("/app/master/quickLink/list");
    }

    return (
        ((quickLink && quickLink.quickLinksId && routeParams.quickLinksId.toString() !== quickLink.quickLinksId.toString())) ?
            <FuseLoading />
            :
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
                                        to="/app/master/quickLink/list"
                                        color="inherit"
                                    >
                                        <Icon className="text-20">
                                            {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
                                        </Icon>
                                        <span className="mx-4"><Label labelId="BL00007" /></span>
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
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                {quickLinksId == 'new' ? <Label labelId="BL00068" /> : <Label labelId="BL00065" />} <Label labelId="BL00007" />
                                            </Typography>
                                        </FuseAnimate>
                                        {/* <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption"></Typography>
                                        </FuseAnimate> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                content={
                    <div className="p-16 sm:p-24">
                        {quickLinksId == "new" && quickLink && (
                            <SmartForm
                                template={template}
                                // validate={validate}
                                onSubmit={onSubmit}
                                onCancel={onCancel}
                                //onChange={data => handleDataChange(data)}
                                buttons={['save', 'cancel']}
                            />
                        )}
                        {quickLinksId !== "new" && quickLink && quickLink.quickLinksId && quickLink.quickLinksId == quickLinksId && (
                            <SmartForm
                                defaultValues={quickLink}
                                template={template}
                                //watchFields={['']}
                                // validate={validate}
                                onSubmit={onSubmit}
                                onCancel={onCancel}
                                //onChange={data => handleDataChange(data)}
                                buttons={['save', 'cancel']}
                            />
                        )}
                    </div>
                }
            // innerScroll
            />
    );
}

export default BillType;
