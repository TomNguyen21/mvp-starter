import React from 'react';
import Modal from './Modal.jsx';
import styled from 'styled-components';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      max: 0,
      formula: (weight, reps) =>{ return weight * (36 / (37 - reps)) },
      isLbs: true,
      click1: true,
      click2: false,
      click3: false,
      show: false,
    };
    this.calculateMax = this.calculateMax.bind(this);
    this.resetMax = this.resetMax.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setMetric = this.setMetric.bind(this);
    this.setBryzchi = this.setBryzchi.bind(this);
    this.setEpley = this.setEpley.bind(this);
    this.setLombardi = this.setLombardi.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  calculateMax(weight, reps) {
    this.setState({ max: Math.round(this.state.formula(weight, reps)) })
  }

  resetMax() {
    this.setState({ max: 0 });
  }

  handleSubmit(e) {
    e.preventDefault();
  }
  setMetric() {
    this.setState({ isLbs: !this.state.isLbs })
  }
  setBryzchi() {
    this.setState({
      formula: (weight, reps) => {
        return weight * (36/ (37 - reps));
      },
      click1: true,
      click2: false,
      click3: false,
    });
  }

  setEpley() {
    this.setState({
      formula: (weight, reps) => {
        return weight * (1 + (reps/30) );
      },
      click1: false,
      click2: true,
      click3: false,
    });
  }

  setLombardi() {
    this.setState({ formula: (weight, reps) => {
      return weight * reps**0.10;
    },
    click1: false,
    click2: false,
    click3: true,
  });
  }


  //TODO: Finish method to add logs to database
  addLogs() {
    this.addLogs();
  }

  showModal() {
    this.setState({ show: !this.state.show });
  }

  //TODO: create button to save logs to database
  render() {
    let max = this.state.max;
    let isLbs = this.state.isLbs;
    let measurement = isLbs ? 'lb' : 'kg';
    return (
      <FormStyle onSubmit={this.handleSubmit}>
      <div>
        <FormulaHead>
          Formula
          <ButtonRow>
            <FormulaButtons onClick={this.setBryzchi} style={this.state.click1 ? {backgroundColor: "#22438C", color: "#FFFFFF"} : {backgroundColor: ''}}>Bryzchi</FormulaButtons>
            <CenterFormulaButtons onClick={this.setEpley} style={this.state.click2 ? {backgroundColor: "#22438C", color: "#FFFFFF"} : {backgroundColor: ''}}>Epley</CenterFormulaButtons>
            <FormulaButtons onClick={this.setLombardi} style={this.state.click3 ? {backgroundColor: "#22438C", color: "#FFFFFF"} : {backgroundColor: ''}}>Lombardi</FormulaButtons>
          </ButtonRow>
        </FormulaHead>

      </div>
        <div>
          <FormulaHead>Weight <small>{measurement}</small></FormulaHead>
          <FormWeight required id="weight" min="0" type="number" placeholder="Enter Weight"/>
          <FormulaHead>Number of Reps</FormulaHead>
          <DropdownReps required id="reps" id="reps" defaultValue="">
            <option value="" disabled defaultValue hidden>Select Num</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            </DropdownReps>
          </div>
          <div>
            <CalculateButton onClick={() => this.calculateMax(document.getElementById('weight').value, document.getElementById('reps').value)}>Calculate</CalculateButton>
            <br/>
            <ResetButton onClick={this.resetMax} type="reset" />
          </div>
          <OneRepMax>Your one rep max:</OneRepMax>
          <Max>{max} {measurement} <ModalButton  onClick={ (e) => {this.showModal()}}>Show Details<img src="https://hackreactor5erfliesmoreplaces.s3-us-west-1.amazonaws.com/Vector.png" /></ModalButton><button className='save-logs'>Save Log</button></Max>
          <Modal show={this.state.show} max={this.state.max} showModal={this.showModal}>
            <CalculatedPercents>
              <div className="col1">
                <ul>
                  <UnbulletList>95% 1 RM: {Math.round(max * .95)} {measurement}</UnbulletList>
                  <UnbulletList>85% 1 RM: {Math.round(max * .85)} {measurement}</UnbulletList>
                  <UnbulletList>75% 1 RM: {Math.round(max * .75)} {measurement}</UnbulletList>
                  <UnbulletList>65% 1 RM: {Math.round(max * .65)} {measurement}</UnbulletList>
                  <UnbulletList>55% 1 RM: {Math.round(max * .55)} {measurement}</UnbulletList>
                </ul>
              </div>
              <div className="col2">
                <ul>
                  <UnbulletList>90% 1 RM: {Math.round(max * .90)} {measurement}</UnbulletList>
                  <UnbulletList>80% 1 RM: {Math.round(max * .80)} {measurement}</UnbulletList>
                  <UnbulletList>70% 1 RM: {Math.round(max * .70)} {measurement}</UnbulletList>
                  <UnbulletList>60% 1 RM: {Math.round(max * .60)} {measurement}</UnbulletList>
                  <UnbulletList>50% 1 RM: {Math.round(max * .50)} {measurement}</UnbulletList>
                </ul>
              </div>
            </CalculatedPercents>
          </Modal>
      </FormStyle>
    )
  }
}
const FormStyle = styled.form`
  position: absolute;
  left: 28px;
  top: 383px;
`;
const CalculatedPercents = styled.div`
  display: flex;
  flex-direction: row;
  clear: both;
  border-radius: 50px;
`;
const FormulaHead = styled.h3`
  font-family: Karla;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
`;
const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 321px;
  height: 41px;
  background: #FFFFFF;
  border-radius: 4px;
  box-shadow: 3px 4px 10px rgba(106, 106, 106, 0.16);
  margin-top: 10px;
`;
const FormulaButtons = styled.button`
  width: 321px;
  height: 41px;
  font-family: Karla;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  background-color: #FFFFFF;
  line-height: 16px;
  text-align: center;
  border: none;
  outline: none;
  :hover {
    background-color: #f2f2f2
  }
  :active {
    transform: scale(.9);
    box-shadow: 1px 2px 5px rgba(106, 106, 106, 0.16);
  }
`;
const CenterFormulaButtons = styled.button`
  width: 321px;
  height: 41px;
  font-family: Karla;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  background-color: #FFFFFF;
  line-height: 16px;
  text-align: center;
  border: none;
  outline: none;
  border-left: 1px solid rgba(0,0,0,0.16);
  border-right: 1px solid rgba(0,0,0,0.16);
  :hover {
    background-color: #f2f2f2
  }
  :active {
    transform: scale(.9);
    box-shadow: 1px 2px 5px rgba(106, 106, 106, 0.16);
  }
`;

const FormWeight = styled.input`
  width: 100px;
  height: 41px;
  font-family: Karla;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  text-align: center;
  border: 1px solid;
  border-color: #C4C4C4;
  border-radius: 4px;
`

const DropdownReps = styled.select`
  width: 100px;
  height: 41px;
  font-family: Karla;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  text-align: center;
  border: 1px solid;
  border-color: #C4C4C4;
  border-radius: 4px;
  text-align-last: center;
  :invalid {
    color: gray;
  }
`
const CalculateButton = styled.button`
  width: 321px;
  height: 41px;
  background-color: #407BFF;
  font-family: Karla;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #FFFFFF;
  border: none;
  border-radius: 4px;
  outline: none;
  margin: 20px 0px 0px 0px;
  :active {
    transform: scale(.9);
    box-shadow: 1px 2px 5px rgba(106, 106, 106, 0.16);
  }
`;

const ResetButton = styled.input`
  width: 321px;
  height: 41px;
  background-color: #FFFFFF;
  font-family: Karla;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #407BFF;
  border: none;
  :active {
    transform: scale(.9);
    box-shadow: 1px 2px 5px rgba(106, 106, 106, 0.16);
  }
`;

const OneRepMax = styled.div`
  width: 171px;
  height: 29px;
  font-family: Karla;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
`;
const ModalButton = styled.button`
  position: absolute;
  left: 180px;
  width: 140px;
  height: 41px;
  background-color: #FFFFFF;
  font-family: Karla;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #407bff;
  border: 2px solid ;
  border-color: #407bff;
  border-radius: 50px;
  outline: none;
  :hover {
    background-color: #F2F2F2;
  }
  :active {
    transform: scale(.9);
    box-shadow: 1px 2px 5px rgba(106, 106, 106, 0.16);
  }
`
const Max = styled.div`
  position: relative;
  width: 500px;
  height: 43px;
  font-family: Karla;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 16px;

  color: #407BFF;
`
const UnbulletList = styled.li`
  list-style-type: none;
`
export default Form;
