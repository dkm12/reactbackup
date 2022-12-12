import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
// import { getMyREFApp, selectMyRefApp } from './store/loginSlice'
import { getMyIJPApp, selectMyIjpApp } from './store/loginSlice'


// import { selectGallery } from '../login/store/loginSlice'
// import { decrement, increment } from './store/loginSlice'
export default function Asd() {
//   const count = useSelector((state) => state.counter.value)
// const folderList = useSelector(selectGallery);
	const IJPJobPosting = useSelector(selectMyIjpApp);
  const dispatch = useDispatch()
	useEffect(() => {
		let url = {
			'pgNo': 0,
			'pgSize': 10
		}
		dispatch(getMyIJPApp(url));
	}, [dispatch]);
  return (
    <div>
    {/* <div onClick={()=>dispatch(increment())}> */}
        {/* {folderList.map((item, i) => {
            <div>KKKKKKK</div>
        })} */}
      LKLKKKKKKK
    </div>
  )
}