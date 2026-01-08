let address = 0x30

enum Motorlist {
    //% block="A"
    M1 = 1,
    //% block="B"
    M2 = 2
}

enum Direction1 {
    //% block="Frente"
    Forward = 0,
    //% block="Trás"
    Backward = 1
}

enum LED_rgb_L_R {
    //% block="LED da direita"
    LED_R = 1,
    //% block="LED da esquerda"
    LED_L = 0,
}

enum LED_color {
    //% block="Vermelho"
    red1 = 1,
    //% block="Verde"
    green1 = 2,
    //% block="Azul"
    blue1 = 3,
    //% block="Ciano"
    cyan = 4,
    //% block="Rosa"
    purple = 5,
    //% block="Branco"
    white = 6,
    //% block="Amarelo"
    yellow = 7,
    //% block="Desligar LED"
    black = 8,
}

// Corrigi os nomes das variáveis aqui (estavam trocados _r com _l)
enum pwm_led_l {
    //% block="vermelho"
    pwm_red_l = 0x08,
    //% block="verde"
    pwm_green_l = 0x07,
    //% block="azul"
    pwm_blue_l = 0x06,
}

enum pwm_led_r {
    //% block="vermelho"
    pwm_red_r = 0x09,
    //% block="verde"
    pwm_green_r = 0x0a,
    //% block="azul"
    pwm_blue_r = 0x05,
}

//% weight=100 color=#0364db icon="\uf1b9"
namespace JuniBot {

    //% block="Motor = | %motor Direção = | $direction Velocidade = $pwmvalue"
    //% pwmvalue.min=0 pwmvalue.max=255 
    //% group="Motor" weight=65
    export function motor(motor: Motorlist, direction: Direction1, pwmvalue: number) {
        switch (motor) {
            case 1: // M1
                if (direction) { 
                    motor_i2cWrite(0x01, pwmvalue); motor_i2cWrite(0x02, 0); }
                else { 
                    motor_i2cWrite(0x02, pwmvalue); motor_i2cWrite(0x01, 0); }
                break;
            case 2: // M2
                if (direction) { 
                    motor_i2cWrite(0x04, pwmvalue); motor_i2cWrite(0x03, 0); }
                else { 
                    motor_i2cWrite(0x03, pwmvalue); motor_i2cWrite(0x04, 0); }
                break;
        }
    }

    //% block="Sequência de LEDs"
    //% group="RGB LED" weight=65
    export function led_show() {
        let a, s, d;

        motor_i2cWrite(0x07, 255); motor_i2cWrite(0x06, 255);
        motor_i2cWrite(0x0a, 255); motor_i2cWrite(0x05, 255);
        //Vermelho
        for (a = 255; a > 1; a--) {
            motor_i2cWrite(0x08, a);
            motor_i2cWrite(0x09, a);
            basic.pause(5);
        }
        //Verde
        for (s = 255; s > 1; s--) {
            motor_i2cWrite(0x07, s);
            motor_i2cWrite(0x0a, s);
            basic.pause(5);
        }
        //Vermelho apagar
        for (a = 0; a < 255; a++) {
            motor_i2cWrite(0x08, a);
            motor_i2cWrite(0x09, a);
            basic.pause(5);
        }
        //Azul
        for (d = 255; d > 1; d--) {
            motor_i2cWrite(0x06, d);
            motor_i2cWrite(0x05, d);
            basic.pause(5);
        }
        //Verde apagar
        for (s = 0; s < 255; s++) {
            motor_i2cWrite(0x07, s);
            motor_i2cWrite(0x0a, s);
            basic.pause(5);
        }
        //Vermelho acender
        for (a = 255; a > 1; a--) {
            motor_i2cWrite(0x08, a);
            motor_i2cWrite(0x09, a);
            basic.pause(5);
        }
        //Azul apagar
        for (d = 0; d < 255; d++) {
            motor_i2cWrite(0x06, d);
            motor_i2cWrite(0x05, d);
            basic.pause(5);
        }
        //Vermelho apagar
        for (a = 0; a < 255; a++) {
            motor_i2cWrite(0x08, a);
            motor_i2cWrite(0x09, a);
            basic.pause(5);
        }
    }

    //% block="LED da direita= |%color PWM= |$value"
    //% value.min=0 value.max=255
    //% group="RGB LED" weight=66
    export function PWM_LED_R(color: pwm_led_r, value: number) {
        motor_i2cWrite(color, value);
    }

    //% block="LED da esquerda= |%color PWM= |$value"
    //% value.min=0 value.max=255
    //% group="RGB LED" weight=67
    export function PWM_LED_L(color: pwm_led_l, value: number) {
        motor_i2cWrite(color, value);
    }

    //% block="Desligar LED"
    //% group="RGB LED" weight=64
    export function LED_OFF() {
        motor_i2cWrite(0x08, 255); motor_i2cWrite(0x07, 255); motor_i2cWrite(0x06, 255);
        motor_i2cWrite(0x09, 255); motor_i2cWrite(0x0a, 255); motor_i2cWrite(0x05, 255);
    }

    //% block="RGB = |%place Cor = |$color"
    //% group="RGB LED" weight=68
    export function led_rgb(place: LED_rgb_L_R, color: LED_color) {
        if (place == 1) { // Direita
            switch (color) {
                case 1: { motor_i2cWrite(0x08, 0); motor_i2cWrite(0x07, 255); motor_i2cWrite(0x06, 255); }; break;
                case 2: { motor_i2cWrite(0x08, 255); motor_i2cWrite(0x07, 0); motor_i2cWrite(0x06, 255); }; break;
                case 3: { motor_i2cWrite(0x08, 255); motor_i2cWrite(0x07, 255); motor_i2cWrite(0x06, 0); }; break;
                case 4: { motor_i2cWrite(0x08, 255); motor_i2cWrite(0x07, 0); motor_i2cWrite(0x06, 0); }; break;
                case 5: { motor_i2cWrite(0x08, 0); motor_i2cWrite(0x07, 255); motor_i2cWrite(0x06, 0); }; break;
                case 6: { motor_i2cWrite(0x08, 0); motor_i2cWrite(0x07, 0); motor_i2cWrite(0x06, 0); }; break;
                case 7: { motor_i2cWrite(0x08, 0); motor_i2cWrite(0x07, 0); motor_i2cWrite(0x06, 255); }; break;
                case 8: { motor_i2cWrite(0x08, 255); motor_i2cWrite(0x07, 255); motor_i2cWrite(0x06, 255); }; break;
            }
        }
        if (place == 0) { // Esquerda
            switch (color) {
                case 1: { motor_i2cWrite(0x09, 0); motor_i2cWrite(0x0a, 255); motor_i2cWrite(0x05, 255); }; break;
                case 2: { motor_i2cWrite(0x09, 255); motor_i2cWrite(0x0a, 0); motor_i2cWrite(0x05, 255); }; break;
                case 3: { motor_i2cWrite(0x09, 255); motor_i2cWrite(0x0a, 255); motor_i2cWrite(0x05, 0); }; break;
                case 4: { motor_i2cWrite(0x09, 255); motor_i2cWrite(0x0a, 0); motor_i2cWrite(0x05, 0); }; break;
                case 5: { motor_i2cWrite(0x09, 0); motor_i2cWrite(0x0a, 255); motor_i2cWrite(0x05, 0); }; break;
                case 6: { motor_i2cWrite(0x09, 0); motor_i2cWrite(0x0a, 0); motor_i2cWrite(0x05, 0); }; break;
                case 7: { motor_i2cWrite(0x09, 0); motor_i2cWrite(0x0a, 0); motor_i2cWrite(0x05, 255); }; break;
                case 8: { motor_i2cWrite(0x09, 255); motor_i2cWrite(0x0a, 255); motor_i2cWrite(0x05, 255); }; break;
            }
        }
    }

    /**
    * Ultrasonic sensor
    */
    const TRIG_PIN = DigitalPin.P14;
    const ECHO_PIN = DigitalPin.P15;
    pins.setPull(TRIG_PIN, PinPullMode.PullNone);
    let lastTime = 0;
    
    //% block="Ultrassom (cm)"
    //% group="Ultrasonic Sensor" weight=67
    export function ultra(): number {
        //send trig pulse
        pins.digitalWritePin(TRIG_PIN, 0)
        control.waitMicros(2);
        pins.digitalWritePin(TRIG_PIN, 1)
        control.waitMicros(10);
        pins.digitalWritePin(TRIG_PIN, 0)

        // read echo pulse max distance : 6m(35000us)
        let t = pins.pulseIn(ECHO_PIN, PulseValue.High, 35000);
        let ret = t;

        //Eliminate the occasional bad data
        if (ret == 0 && lastTime != 0) {
            ret = lastTime;
        }
        lastTime = t;
        
        return Math.round(ret / 58);
    }

    /**
     * photoresistance sensor
     */
    //% block="LDR da esquerda"
    //% group="Photoresistance Sensor" weight=66
    export function PH1(): number {
        return pins.analogReadPin(AnalogPin.P1);
    }

    //% block="LDR da direita"
    //% group="Photoresistance Sensor" weight=66
    export function PH2(): number {
        return pins.analogReadPin(AnalogPin.P0);
    }

    /**
    * return 0b01 or 0b10
    */
    pins.setPull(DigitalPin.P12, PinPullMode.PullUp); // Nota: Alterado para PullUp
    pins.setPull(DigitalPin.P13, PinPullMode.PullUp); // Nota: Alterado para PullUp
    
    //% block="Seguidor de Linha"
    //% group="Line Tracking" weight=68
    export function LineTracking(): number {
        let val = pins.digitalReadPin(DigitalPin.P12) << 0 | pins.digitalReadPin(DigitalPin.P13) << 1;
        return val;
    }

    //% block="Definir servo para ângulo %angle"
    //% group="Servo" weight=69
    //% angle.min=0 angle.max=180
    export function setServo(angle: number): void {
        pins.servoWritePin(AnalogPin.P2, angle)
    }
}

function motor_i2cWrite(reg: number, value: number) {
    let buf = pins.createBuffer(2)
    buf[0] = reg
    buf[1] = value
    pins.i2cWriteBuffer(address, buf)
}
