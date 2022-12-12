import AddToCartComp from '../components/addToCart';
import {connect} from 'react-redux';
const mapStateToProps=state=>({
  data:state.CardIteams
 })
 const mapDispatchToProps=dispatch=>({
    //  addToCartHandler:data=>dispatch(addToCart(data))
 
 })
 export default connect(mapStateToProps,mapDispatchToProps)(AddToCartComp )



