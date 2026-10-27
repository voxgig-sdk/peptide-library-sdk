
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { PeptideLibrarySDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = PeptideLibrarySDK.test()
    equal(testsdk instanceof PeptideLibrarySDK, true,
      'PeptideLibrarySDK.test() must return a client synchronously')
  })

})
