/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,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';
const soundByteArray = base64SoundToByteArray( phetAudioContext, soundURI );
const unlock = simLauncher.createLock( soundURI );
const wrappedAudioBuffer = new WrappedAudioBuffer();
const onDecodeSuccess = decodedAudio => {
  wrappedAudioBuffer.audioBufferProperty.set( decodedAudio );
  unlock();
};
const onDecodeError = decodeError => {
  console.warn( 'decode of audio data failed, using stubbed sound, error: ' + decodeError );
  wrappedAudioBuffer.audioBufferProperty.set( phetAudioContext.createBuffer( 1, 0, phetAudioContext.sampleRate ) );
  unlock();
};
phetAudioContext.decodeAudioData( soundByteArray.buffer, onDecodeSuccess, onDecodeError );
export default wrappedAudioBuffer;