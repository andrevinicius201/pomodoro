import { Component, useEffect } from "react";

export default class Timer extends Component {

    constructor(){
        super()
        this.controlTimer=this.controlTimer.bind(this);
        this.startTimer=this.startTimer.bind(this);
        this.resumeTimer=this.resumeTimer.bind(this);
        this.pauseTimer=this.pauseTimer.bind(this);
        this.tick=this.tick.bind(this);
        this.updateRequestedMinutes=this.updateRequestedMinutes.bind(this);
        this.state = {
            minutes: 0,
            seconds: 0,
            displaySeconds: 0,
            runnnig: false,
            initiated: false,
            buttonMessage: "Start timer",
            disableSetupFieldButton: false
        };
    }


    changeButonStatus(status){
        this.setState({
            buttonMessage: status,
        })
    }

    

    controlTimer(){
        if(!this.state.initiated){
            this.startTimer()
        }

        if(this.state.initiated && this.state.runnnig){
            this.pauseTimer()
        }

        if(this.state.initiated && !this.state.runnnig){
            this.resumeTimer()
        }
    }

    startTimer(){
        this.setState({
            initiated: true,
            runnnig: true,
            seconds:(this.state.minutes * 60) - 1
        })

        this.timerID = setInterval(
            () => this.tick(),
            1000
        ); 
        this.changeButonStatus("Pause")
        this.setState({
            disableSetupFieldButton: true
        })
    }

    pauseTimer(){
        this.setState({
            runnnig: false
        })
        clearInterval(this.timerID)
        this.changeButonStatus("Resume")
    }

    resumeTimer(){
        this.setState({
            runnnig: true
        })
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
        this.changeButonStatus("Pause")
    }
    
    stopTimer(){
        this.setState({
            initiated: false,
            runnnig: false
        })
        alert("Fim do timer")
        this.changeButonStatus("Start timer")
    }

    tick() {
        if(this.state.seconds >= 0){
            this.setState({
                seconds: this.state.seconds-1,
                minutes: parseInt(this.state.seconds / 60),
                displaySeconds: parseInt(this.state.seconds % 60)
            });
        } else {
            this.stopTimer()
        }

    }


    updateRequestedMinutes(operation){
        if(operation == "plus"){
            this.setState({
                minutes: this.state.minutes + 5
            })
        } else {
            this.setState({
                minutes: this.state.minutes - 5
            })
        }
    }



    render() {
      return (
            <div className="bg-red-700 w-full h-screen flex flex-col justify-center items-center m-auto">
                
                <h1 className="text-9xl text-white"> {this.state.minutes}:{this.state.displaySeconds} </h1>
                
                    
                    <div className="mt-16">
                        <img src="img/minus.svg" className="max-w-12 inline mr-6" onClick={() => this.updateRequestedMinutes("minus")} />
 
                        <img src="img/plus.svg" className="max-w-12 inline ml-6" onClick={() => this.updateRequestedMinutes("plus")} />
                    </div>

                
                <button onClick={this.controlTimer} className="m-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    {
                        this.state.buttonMessage
                    }
                </button>
                
            </div>
                                

        )
    }
}