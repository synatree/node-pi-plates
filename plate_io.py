import sys
import json
import piplates.DAQCplate as DP
import piplates.RELAYplate as RP
import piplates.MOTORplate as MP

# All Pi Plate communication must go through this one process to ensure
# SPI communications don't overlap / interfere and corrupt the device state(s)
#
# listen for json messages on stdin of the format:
# {
#   addr: <pi plate address 0-7>,
#   plate_type: <RELAY|DAQC>,
#   cmd: <command string>, args: {<command-specific args>}
# }

#TODO: scan for plates at startup so we can handle wrong-address
#      or plate_type mismatch exceptions

while True:
    try:
        line = sys.stdin.readline()
        # TODO: add error handling for invalid JSON
        msg = json.loads(line)
        addr = msg['addr']
        plate_type = msg['plate_type']
        cmd = msg['cmd']
        args = msg['args']
        resp = {}
        if (plate_type == "RELAY"):
            if (cmd == "setLED"):
                RP.setLED(addr)
                resp['LED'] = 1
            elif (cmd == "clrLED"):
                RP.clrLED(addr)
                resp['LED'] = 0
            elif (cmd == "toggleLED"):
                RP.toggleLED(addr)
                resp['LED'] = "UNKNOWN"
            elif (cmd == "getID"):
                resp['ID'] = RP.getID(addr)
            elif (cmd == "getHWrev"):
                resp['HWrev'] = RP.getHWrev(addr)
            elif (cmd == "getFWrev"):
                resp['FWrev'] = RP.getFWrev(addr)
            elif (cmd == "getPMrev"):
                resp['PMrev'] = RP.getPMrev()
            elif (cmd == "getADDR"):
                resp['ADDR'] = RP.getADDR(addr)
            elif ("relay" in cmd):
                relay = args['relay']
                if (cmd == "relayON"):
                    RP.relayON(addr, relay)
                elif (cmd == "relayOFF"):
                    RP.relayOFF(addr, relay)
                elif (cmd == "relayTOGGLE"):
                    RP.relayTOGGLE(addr, relay)
                state = RP.relaySTATE(addr)
                this_state = (state >> (relay - 1)) & 1
                resp['relay'] = relay
                resp['state'] = this_state
            elif (cmd == "RESET"):
                RP.RESET(addr)
                resp['RESET'] = "OK";
            else:
                sys.stderr.write("unknown relay cmd: " + cmd)
                break
            print(json.dumps(resp))
        elif (plate_type == "DAQC"):
            if (cmd == "getDINbit"):
                bit = args['bit']
                state = DP.getDINbit(addr, bit)
                resp['bit'] = bit
                resp['state'] = state
            elif (cmd == "setDOUTbit"):
                bit = args['bit']
                DP.setDOUTbit(addr, bit)
                resp['bit'] = bit
                resp['state'] = 1
            elif (cmd == "clrDOUTbit"):
                bit = args['bit']
                DP.clrDOUTbit(addr, bit)
                resp['bit'] = bit
                resp['state'] = 0
            elif (cmd == "toggleDOUTbit"):
                bit = args['bit']
                DP.toggleDOUTbit(addr, bit)
                resp['bit'] = bit
                resp['state'] = 'UNKNOWN'
            elif (cmd == "getADC"):
                channel = args['channel']
                voltage = DP.getADC(addr, channel)
                resp['channel'] = channel
                resp['voltage'] = voltage
            elif (cmd == "getTEMP"):
                bit = args['bit']
                scale = args['scale']
                temp = DP.getTEMP(addr, bit, scale)
                resp['temp'] = temp
                resp['bit'] = bit
            else:
                sys.stderr.write("unknown daqc cmd: " + cmd)
            print(json.dumps(resp))
        elif (plate_type == "MOTOR"):
            break
        else:
            sys.stderr.write("unknown plate_type: " + plate_type)
    except (EOFError, SystemExit):
        sys.exit(0)
