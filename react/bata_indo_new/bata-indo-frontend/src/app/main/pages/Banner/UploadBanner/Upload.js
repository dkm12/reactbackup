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
import { saveBanner, newBanner, getBanner } from '../store/bannerSaveSlice';
import uploadDoc from '@common/utils/uploadDoc';
import SmartForm from '@smart-form';
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



function BillType(props) {
    const dispatch = useDispatch();
    const uuid = useSelector(({ auth }) => auth.user.uuid);
    const banner = useSelector(({ banner }) => banner.bannerSave);
    const [loading, setLoading] = useState(false);

    const theme = useTheme();

    const classes = useStyles(props);
    const routeParams = useParams();
    const { id } = routeParams;

    useEffect(() => {
        setLoading(false);
    }, [banner]);


    useDeepCompareEffect(() => {
        async function updateProductState() {
            if (id === 'new') {
                dispatch(newBanner());
            }
            else {
                dispatch(getBanner(routeParams));
                setLoading(true);
            }
        }
        updateProductState();
        setLoading(false);
    }, [dispatch, routeParams]);

    let template = {
        layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
        description: 'Form for applying Job',
        sections: [
            {
                fields: [
                    {
                        type: "section",
                        title: GetLabel('BL00134'),
                        layout: { column: 3, spacing: 2, size: 'medium', label: 'fixed' },
                        fields: [
                            {
                                type: 'file',
                                accept: '.jpg,.jpeg,.png',
                                name: 'attachmentFile',
                                id: 'attachmentFile',
                                title: GetLabel('BL00134'),
                                fileName: false,
                                validationProps: {
                                    size: {
                                        value: 10,
                                        message: 'File size should not be more than 10mb.'
                                    },
                                },
                            },
                            {
                                type: 'attachment',
                                name: 'imageUrl',
                                id: 'imageUrl',
                                dynamic: {
                                    field: 'createdBy',
                                    value: uuid
                                }
                            }
                        ]

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
                    }],
            },

        ],
    };

    async function onSubmit(values) {
        let { attachmentFile, ...rest } = values.data;

        let fileURL = values.data.imageUrl;
        if (values.data && values.data.attachmentFile && values.data.attachmentFile.length > 0) {
            let fileObj = values.data.attachmentFile[0];
            let fileData = await uploadDoc.saveDoc(fileObj, "Banner");
            console.log("fileData", fileData);
            if (_.isArray(fileData) && fileData.length > 0) {
                fileURL = fileData[0].fileUrl;
            }
        }
        if (values.button.toUpperCase() === "SUBMIT") {
            dispatch(saveBanner({ banner: { ...rest, imageUrl: fileURL } }))
            setLoading(true);

        }
    }

    function onCancel() {
        //console.log(values);
        props.history.push("/app/master/banner/list");
    }

    return (
        ((banner && banner.id && routeParams.id.toString() !== banner.id.toString())) ?
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
                                        to="/app/master/banner/list"
                                        color="inherit"
                                    >
                                        <Icon className="text-20">
                                            {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
                                        </Icon>
                                        <span className="mx-4"><Label labelId="BL00414" /></span>
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
                                                {id == 'new' ? <Label labelId="BL00416" /> : <Label labelId="BL00417" />}
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
                        {id == "new" && banner && (
                            <SmartForm
                                template={template}
                                // validate={validate}
                                onSubmit={onSubmit}
                                onCancel={onCancel}
                                //onChange={data => handleDataChange(data)}
                                buttons={['submit', 'cancel']}
                            />
                        )}
                        {id !== "new" && banner && banner.id && banner.id == id && (
                            <SmartForm
                                defaultValues={banner}
                                template={template}
                                //watchFields={['']}
                                // validate={validate}
                                onSubmit={onSubmit}
                                onCancel={onCancel}
                                //onChange={data => handleDataChange(data)}
                                buttons={['submit', 'cancel']}
                            />
                        )}
                    </div>
                }
            // innerScroll
            />
    );
}

export default BillType;
