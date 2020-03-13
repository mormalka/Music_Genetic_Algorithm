import { initialize, Endpoint, Self } from '@muzilator/sdk'

const init = async () => {
  const platform = await initialize()

  await platform.loadLibrary('sequence-player', 'sequence-player')
  await platform.loadLibrary('music-genetic-algorithm-plugin', 'bubbles', 'primary')
  await platform.loadLibrary('midi-synth', 'synth1')
  await platform.loadLibrary('midi-synth', 'synth2') // why do we need both synth1 and synth2 ??

  await platform.connectChannels(Endpoint('bubbles', 'midi'), Endpoint('synth1', 'midi'))
  await platform.connectChannels(Endpoint('bubbles', 'midi'), Endpoint('synth2', 'midi'))

  await platform.connectChannels(Self('sequence'), Endpoint('sequence-player', 'midi'))
  await platform.connectChannels(Endpoint('sequence-player', 'midi'), Endpoint('synth', 'midi'))
}

init()
