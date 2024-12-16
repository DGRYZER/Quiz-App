import { LightningElement } from 'lwc';

export default class QuizApp extends LightningElement {

    selected = {};
    correctAnswer = 0
    isSubmitted = false;
    myQuestions = [
        {
            id: "Question1",
            question: "What is the extension of the apex class?",
            answers: {
                a: ".apxc",
                b: ".html",
                c: ".js"
            },
            correctAnswer: "a"
        },
        {
            id: "Question2",
            question: "Which data type in Salesforce is used to store text values?",
            answers: {
                a: "Number",
                b: "Boolean",
                c: "String"
            },
            correctAnswer: "c"
        },
        {
            id: "Question3",
            question: "What is the maximum size of a single record in Salesforce?",
            answers: {
                a: "2 KB",
                b: "4 KB",
                c: "6 KB"
            },
            correctAnswer: "c"
        },
        {
            id: "Question4",
            question: "Which of the following is a valid trigger event in Salesforce?",
            answers: {
                a: "Before Delete",
                b: "After Update",
                c: "Both a and b"
            },
            correctAnswer: "c"
        },
        {
            id: "Question5",
            question: "What is the default governor limit for SOQL queries per transaction?",
            answers: {
                a: "50",
                b: "100",
                c: "200"
            },
            correctAnswer: "b"
        }
    ];  
    
    changeHandler(event){
        console.log("Name", event.target.name);
        console.log("Value", event.target.value);
        const {name, value} = event.target;
        this.selected = {...this.selected, [name]:value};
    }
    
    get allNotSelected (){
        return !(Object.keys(this.selected).length === this.myQuestions.length);
    }
    get scoredMessage() {
        if (this.isSubmitted) {
            return `You have correctly answered ${this.correctAnswer} out of ${this.myQuestions.length}. Total Percentage is ${this.totalPercentage}%`;
        }
        return '';
    }

    get isScoredFull() {
        return this.correctAnswer === this.myQuestions.length ? 'slds-text-color_success'
            : this.isSubmitted ? 'slds-text-color_error' : '';
    }
    
    get totalPercentage() {
        if (this.myQuestions?.length) {
            return (this.correctAnswer / this.myQuestions.length) * 100;
        }
        return 0;
    }
    

    submitHandler(event){
        event.preventDefault();
        this.isSubmitted = true;
        let correct = this.myQuestions.filter(item=>this.selected[item.id] === item.correctAnswer);
        this.correctAnswer = correct.length;
        console.log("Correct Answer:" + this.correctAnswer);
    }

    resetHandler(){
        this.selected = {};
        this.correctAnswer = 0;
        this.isSubmitted = false;
    }
}