import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTags } from "../../actions/recipes.js";


export class Tags extends Component{
	static propType = {
		tags: PropTypes.array.isRequired,
	}

	componentDidMount(){
		tags: this.props.getTags();
	}
	
	addData = (e) => {
		/*console.log(e.target.value)*/
		this.props.list.push(e.target.value);
		var newList=this.props.list;
		this.setState({list: newList})
	}	
	
	render(){
		
		return(
			<Fragment>
				<label>Tags</label>
				<div className="my-custom-scrollbar">
				<table className ="table mb-0" style={{width: 150 + 'px', text_align: 'left'}}>
					<tbody>
						{ this.props.tags.map(tag =>(
							<tr key={tag.id}>
							<td><button className="btn ing-list" onClick={this.addData} value={tag.name}
							>{tag.name}</button></td>
						</tr>
						)
					)}
					</tbody>
				</table>
				</div>
			</Fragment>
		)
	}
}
		
const mapStateToProps = state => ({
	tags: state.recipes.tags
})
export default connect(mapStateToProps,{ getTags })(Tags);