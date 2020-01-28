import { initialize, Endpoint } from '@muzilator/sdk'

const init = async () => {
  const platform = await initialize()
  await platform.loadLibrary('music-genetic-algorithm-plugin', 'bubbles', 'primary')
  await platform.loadLibrary('midi-synth', 'synth1')
  await platform.loadLibrary('midi-synth', 'synth2')

  await platform.connectChannels(Endpoint('bubbles', 'midi'), Endpoint('synth1', 'midi'))
  await platform.connectChannels(Endpoint('bubbles', 'midi'), Endpoint('synth2', 'midi'))
}

init()
