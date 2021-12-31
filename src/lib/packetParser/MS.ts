/** IN DEVELOPMENT */
/* eslint-disable */

interface ChannelConfig {
    channels: number,
    fx: number,
    aux: number
}

export default function handleMSPacket(data) {
  const devices: { [device: string]: ChannelConfig } = {
    SL16R: {
      channels: 16,
      aux: 6,
      fx: 2
    }
  }

  const config = devices.SL16R
  data = data.slice(8)

  const values = []
  for (let i = 0; i < config.channels; i++) {
    values.push(data.readUInt16LE(i * 2))
  }
  data = data.slice(config.channels * 2)

  const tape = data.readUInt16LE(0) // tape

  data = data.slice(2)

  const fx_return = []
  for (let i = 0; i < config.fx; i++) {
    fx_return.push(data.readUInt16LE(i * 2))
  }
  data = data.slice(config.fx * 2)

  const talkback = data.readUInt16LE(0)
  data = data.slice(2)

  const aux = []
  for (let i = 0; i < config.aux; i++) {
    aux.push(data.readUInt16LE(i * 2))
  }
  data = data.slice(config.aux * 2)

  const fx = []
  for (let i = 0; i < config.fx; i++) {
    fx.push(data.readUInt16LE(i * 2))
  }
  data = data.slice(config.fx * 2)

  const main = data.readUInt16LE(0)
  data = data.slice(2 * 2)

  return {
    values, tape, fx_return, talkback, aux, fx, main
  }
}
