import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTags } from "../../actions/recipes.js";


export class Tags extends Component{

	constructor() {
		super();
		this.state = {
			isActive:0,
		}
	}
	static propType = {
		tags: PropTypes.array.isRequired,
	}
	componentDidMount(){
		tags: this.props.getTags();
	}
	
	addId = (e) => {
		console.log(e.target.value)
		this.props.action(e.target.value);
		this.setState({
			isActive:e.target.value
		});
	}
	
	render(){
		
		return(
			<Fragment>
				<label>Tags</label>
				<div className="my-custom-scrollbar">
				<table className ="table mb-0" style={{width: 150 + 'px', text_align: 'left'}}>
					<tbody>
						{ this.props.tags.map(tag =>(
							<tr >
							<td key={tag.id}><button className={
								(this.state.isActive==tag.id) ? 
								"btn btn-primary ing-list":
								"btn btn-outline-primary ing-list"}
								onClick={this.addId} value={tag.id}
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