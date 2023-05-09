// import appReducer, { actionsApp, InitializedAppTC } from './appReducer'
// import { authTC } from './authReducer';

// describe('appReducer', () => {
//    let state: any;

//    beforeEach(() => {
//       state = {
//          initialized: false,
//       }
//    })

//    it('Initialized Success action should change initialized to true', () => {
//       let action = actionsApp.initializedSuccess()
//       let newState = appReducer(state, action)
//       expect(newState.initialized).toBeTruthy()
//    })

//    describe('InitializedAppTC', () => {
//       it('should dispatch authTC and initializedSuccess', async () => {
//          let dispatchMock = jest.fn()
//          let getStateMock = jest.fn()

//          await InitializedAppTC()(dispatchMock, getStateMock, undefined)

//          expect(dispatchMock).toBeCalledTimes(2)
//          expect(dispatchMock).toHaveBeenCalledWith(authTC())
//          expect(dispatchMock).toHaveBeenCalledWith(actionsApp.initializedSuccess())
//       })
//    })
// })
