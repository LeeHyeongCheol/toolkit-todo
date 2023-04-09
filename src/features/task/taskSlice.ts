import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
import { RootState } from "../../app/store";

interface TaskState {
  //task가 몇개 있는지 관리
  idCount: number;
  //store에 보존하는 task노 열람
  tasks: { id: number; title: string; completed: boolean }[];
  //task의title을 편집할때 어떤 task를 선택할지
  selectedTask: { id: number; title: string; completed: boolean };
  //Modal을열까닫을까
  isModalOpen: boolean;
}

const initialState: TaskState = {
  idCount: 1,
  tasks: [{ id: 1, title: "Task A", completed: false }],
  selectedTask: { id: 0, title: "", completed: false },
  isModalOpen: false,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    createTask: (state, action) => {
      state.idCount++;
        const newTask = {
        id: state.idCount,  
        title: action.payload,      
        completed: false,
      };
      state.tasks = [newTask, ...state.tasks];
    },
    editTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
      }
    },
    completeTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
    },
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    handleModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const {
  createTask,
  selectTask,
  handleModalOpen,
  editTask,
  deleteTask,
  completeTask,
} = taskSlice.actions;

export const selectTasks = (state: RootState): TaskState["tasks"] =>
  state.task.tasks;

export const selectisModalOpen = (state: RootState): TaskState["isModalOpen"] =>
  state.task.isModalOpen;

export const selectSelectedTask = (
  state: RootState
): TaskState["selectedTask"] => state.task.selectedTask;

export default taskSlice.reducer;
