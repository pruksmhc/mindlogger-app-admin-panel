import React,{Component} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import { Field, reduxForm, FieldArray, formValueSelector, submit } from 'redux-form'
import {FormGroup, FormControl, Button, Row, Col, Glyphicon, Image} from 'react-bootstrap'

import { InputField, InputFieldWithButton } from '../../forms/FormItems';
import {isRequired} from '../../forms/validation';
import '../../forms/form.css';

class SurveyEditQuestionForm extends Component {

    constructor(props) {
      super(props)
    }

    componentWillMount() {
        this.setState({imageSelect: false})
    }

    renderRows = ({fields, meta: {error, submitFailed}}) => {
      return (<div>
            {fields.map((member,index) => (
                <Row key={index}>
                    <Col md={4}>
                        <Field placeholder={`Choice ${index+1}`} name={`${member}.text`} type="text" component={InputField}/>
                    </Col>
                    <Col md={4}>
                        <Field placeholder={`Score`} name={`${member}.value`} type="text" component={InputField}/>
                    </Col>
                    <Col md={4}>
                    <Button onClick={() => fields.remove(index)} bsStyle="danger"><Glyphicon glyph={'trash'}/></Button>
                    </Col>
                </Row>
                
          ))}
          
          <Button onClick={()=> fields.push({text:'', value:fields.length})}>Add choice</Button>
          
        </div>)
    }

    renderImageRows = ({fields, meta: {error, submitFailed}}) => {
        let images = fields.getAll() || []
        return (<div>
            {images.map((item,index) => (
                <Row key={index}>
                    <Col md={3}>
                        <Image thumbnail src={{uri: item.image_url}} />
                    </Col>
                    <Col md={6}>
                        {item.name}
                    </Col>
                    <Col md={3}>
                        <Button transparent onClick={() => fields.remove(index) }><Glyphicon glyph="trash"/></Button>
                    </Col>
                </Row>
            ))}
            <Button onClick={()=> this.showImageBrowser(fields)}>Add choice</Button>
          </div>)
    }

    renderExtraFields(question_type) {
        switch(question_type) {
            case 'single_sel':
            case 'multi_sel':
                return (<FieldArray name="rows" component={this.renderRows}/>)
            case 'image_sel':
                return (<FieldArray name="images" component={this.renderImageRows} value={this.state.images || []}/>)
            default:
                return false
        }
    }

    showImageBrowser(fields) {
        this.imageFields = fields
        this.setState({imageSelect:true})
    }

    onSelectImage = (item, imagePath) => {
        if(item) {
            this.imageFields.push(item)   
        }
        this.setState({imagePath, imageSelect:false})
        
    }


    render() {
      const { handleSubmit, onSubmit, submitting, reset } = this.props;
      let question_type = this.props.question_type || (this.props.initialValues && this.props.initialValues.type)
      return (
          <form>
          <Field name="title" type="text" validate={isRequired} placeholder="Add a question" component={InputField} />
          <Field name="type"
            component={InputField}
            componentClass = "select"
            placeholder = "Question Type"
            options   ={[
              {label:"Text",value:"text"},
              {label:"Choice",value:"single_sel"},
              {label:"Multiple",value:"multi_sel"},
              {label:"Image", value:"image_sel"}
            ]} validate={isRequired} />
            { this.renderExtraFields(question_type) }
            {/* this.state.imageSelect && <ImageBrowser path={this.state.imagePath} onSelectImage={this.onSelectImage}/> */ }
          </form>)
    }
}

const SurveyEditQuestionReduxForm = reduxForm({
    form: 'survey-edit-question',
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true
})(SurveyEditQuestionForm)

const selector = formValueSelector('survey-edit-question')
const SurveyEditQuestionValueForm = connect(
  state => {
    let {type, images} = selector(state, 'type', 'images')
    return {question_type: type, images}
  }
)(SurveyEditQuestionReduxForm)

class SurveyBasicEditQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
        mode: 1,
        };
    }

    componentWillMount() {
        let {act} = this.props
        this.setState({act})
    }

    render() {
        let {questionIndex, act, onUpdate} = this.props
        const survey = act.act_data
        let question = {
            type: "text",
            rows: [],
            images: []
        }
        survey.questions = survey.questions || []
        if(questionIndex<survey.questions.length) {
            question = survey.questions[questionIndex]
        } else if(questionIndex>0) {
            question = {...question, ...survey.questions[questionIndex-1], title: ''}
        }
        return (
        <div>
            <h3>{`Question ${questionIndex+1}`}</h3>
            <SurveyEditQuestionValueForm onSubmit={onUpdate} initialValues={question}/>
            
        </div>
        );
    }
}

const mapDispatchToProps = {
    submit
}
  
const mapStateToProps = state => ({
    
});
  
export default connect(mapStateToProps, mapDispatchToProps)(SurveyBasicEditQuestion)