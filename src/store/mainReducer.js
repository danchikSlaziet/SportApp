import {createSlice} from "@reduxjs/toolkit";

const mainSlice = createSlice({
    name: 'main',
    initialState: {
        platform: null,
        activePanel: 'loading',
        cardInfo: {
        },
        launch_params: {
        },
        isLoading: false,
        activeModal: false,
        modalName: '',
        boxes: [],
        currentBox: {},
        attempts: 0,
        increment: false,
        user: {
            number: '',
            avatar: '',
            name: '',
            cheques: [],
            prizes: [],
        },
        winners: [],
        confirmAll: false,
        firstPage: true,
        groupLink: '',
        isActiveNavbar: false,
        tickets: [],
        heals: 0,
        tasks: [],
        tgID: 0,
        prizes: [],
        gameDays: [],
        referal: '',
        questID: 0,
        questLink: '',
        questText: '',
        friendsCount: 0,
    },
    reducers: {
        setLaunchParams(state, action) {
            state.launch_params = action.payload
        },
        setActivePanel(state, action) {
            state.activePanel = action.payload
        },
        setActiveModal(state, action) {
            state.activeModal = action.payload
        },
        setIsLoading(state, action){
            state.isLoading = action.payload
        },
        setPlatform(state, action){
            state.platform = action.payload
        },
        setBoxes(state, action) {
            state.boxes = action.payload;
        },
        setCurrentBox(state, action) {
            state.currentBox = action.payload
        },
        setAttempts(state, action) {
            state.attempts = action.payload
        },
        setIncrement(state, action) {
            state.increment = action.payload;
        },
        setModalName(state, action) {
            state.modalName = action.payload;
        },
        setCardInfo(state, action) {
            state.cardInfo = action.payload;
        },
        setUserNumber(state, action) {
            state.user.number = action.payload;
        },
        setUserName(state, action) {
            state.user.name = action.payload;
        },
        setUserAvatar(state, action) {
            state.user.avatar = action.payload;
        },
        setCheques(state, action) {
            state.user.cheques = action.payload;
        },
        setWinners(state, action) {
            state.winners = action.payload;
        },
        setConfirmAll(state, action) {
            state.confirmAll = action.payload;
        },
        setFirstPage(state, action) {
            state.firstPage = action.payload;
        },
        setGroupLink(state, action) {
            state.groupLink = action.payload;
        },
        setActiveNavbar(state, action) {
            state.isActiveNavbar = action.payload;
        },
        setTickets(state, action) {
            state.tickets = action.payload;
        },
        setHeals(state, action) {
            state.heals = action.payload;
        },
        setTasks(state, action) {
            state.tasks = action.payload;
        },
        setTgID(state, action) {
            state.tgID = action.payload;
        },
        setPrizes(state, action) {
            state.prizes = action.payload;
        },
        setGameDays(state, action) {
            state.gameDays = action.payload;
        },
        setReferal(state, action) {
            state.referal = action.payload;
        },
        setQuestID(state, action) {
            state.questID = action.payload;
        },
        setFriendsCount(state, action) {
            state.friendsCount = action.payload;
        },
        setQuestLink(state, action) {
            state.questLink = action.payload;
        },
        setQuestText(state, action) {
            state.questText = action.payload;
        }
    }
})

export default mainSlice.reducer
export const {
    setActivePanel,
    setLaunchParams,
    setActiveModal,
    setIsLoading,
    setPlatform,
    setBoxes,
    setCurrentBox,
    setAttempts,
    setIncrement,
    setModalName,
    setCardInfo,
    setUserNumber,
    setUserName,
    setUserAvatar,
    setCheques,
    setWinners,
    setConfirmAll,
    setFirstPage,
    setGroupLink,
    setActiveNavbar,
    setTickets,
    setHeals,
    setTasks,
    setTgID,
    setPrizes,
    setGameDays,
    setReferal,
    setQuestID,
    setFriendsCount,
    setQuestLink,
    setQuestText,
} = mainSlice.actions