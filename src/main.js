class Pomodoro {
    constructor() {
        var self = this;
        this.executing = false;
        // Initial Timer
        this.workTime = 25*60;
        this.restTime = 5*60;
        this.timerSeconds = this.workTime;
        // Add the listener to the Control Button
        this.controlButton = window.document.getElementById("control-button");
        this.controlButton.addEventListener(
            "click",
            ()=>{pomodoro.toggle_start()}
            );
        // Record the timer displays
        this.counterMinutes = window.document.getElementById("counter-minutes");
        this.counterSeconds = window.document.getElementById("counter-seconds");
        // Start the background Animation
        this.backgroundPosition = 0;
        this.backgroundAnimationSpeedFactor = 0.5;
        self.backgroundIntervalEv = window.setInterval(function(){
            document.getElementsByTagName("body")[0].style.backgroundPosition 
                = "center " + self.backgroundPosition + "px";
            self.backgroundPosition += self.backgroundAnimationSpeedFactor
        }, 1000/24);
        // The alarm sound
        self.rind_sound = new Audio('./sound/elevator_ring.mp3');
        // Status
        this.isWorkTime = true;
        this.status = "Work!"
        this.statusMessage = window.document.getElementById("Status");
    }

    start(){
        var self = this;
        this.executing = true;
        // Change the text on the control button
        this.controlButton.innerHTML = "Pause"
        this.controlButton.style.backgroundColor = "Red";
        this.statusMessage.innerHTML = this.status;
        // Timer
        this.timerIntervalEV = window.setInterval(function(){
            self.timerSeconds -= 1;
            self.counterMinutes.innerHTML = Math.round(self.timerSeconds / 60);
            self.counterSeconds.innerHTML = Math.round(self.timerSeconds % 60);
            if(self.timerSeconds == 0) {
                self.rind_sound.play();
                if(self.isWorkTime) {
                    self.isWorkTime = false;
                    self.status = "Rest.";
                    self.statusMessage.innerHTML = self.status;
                    self.timerSeconds = self.restTime;
                    document.getElementById("center-pane").style.backgroundColor = "green";
                } else {
                    self.isWorkTime = true;
                    self.status = "Work!";
                    self.statusMessage.innerHTML = self.status;
                    self.timerSeconds = self.workTime;
                    document.getElementById("center-pane").style.backgroundColor = "orangered";
                }
            }
        }, 1000);
        // Speed up the background animation
        this.backgroundAnimationSpeedFactor = 1.5;
    }

    stop(){
        this.executing = false;
        // Change the text on the control button
        this.controlButton.innerHTML = "Resume!"
        this.controlButton.style.backgroundColor = "Green";
        // Clear the Timer Event
        window.clearInterval(this.timerIntervalEV);
        // Slow Down the background animation
        this.backgroundAnimationSpeedFactor = 0.5;
    }

    toggle_start(){
        var self = this;
        if(self.executing){
            self.stop();
        } else {
            self.start();
        }
    }
}

window.addEventListener("load", function(){
    // Create the pomodor object
    pomodoro = new Pomodoro();
});
