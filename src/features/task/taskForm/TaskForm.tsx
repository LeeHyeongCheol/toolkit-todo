import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { createTask, handleModalOpen, selectSelectedTask, editTask } from '../taskSlice';
import styles from './TaskForm.module.scss';


type Inputs = {
    taskTitle?: string;
};

type PropTypes = {
    edit?: boolean;
}

const TaskForm: React.FC<PropTypes> = ({edit}) => {
    const dispatch = useDispatch();
    const selectedTask = useSelector(selectSelectedTask);
    const {register, handleSubmit, reset} = useForm();
    const handleCreate = (data: Inputs) => {
        dispatch(createTask(data.taskTitle));
        reset();
    };

    const handleEdit = (data:Inputs) => {
        const sendData = { id : selectedTask.id, title: data.taskTitle};
        dispatch(editTask(sendData));
        dispatch(handleModalOpen(false));
    }

   return (
      <div className={styles.root}>
            <form onSubmit={edit ? handleSubmit(handleEdit) : handleSubmit(handleCreate)} className={styles.form}  >
              <TextField 
                id="outlined-basic" 
                label={edit ? 'Edit Task' : 'New Task'}
                defaultValue={edit ? selectedTask.title : ''}
                variant="outlined"
                // inputRef={register}
                // name='taskTitle'
                {...register('taskTitle')}//영상이랑 VERSION이 달라서 이걸로 사용
                className={styles.text_field} />
                {edit ? (
                    <div className={styles.button_wrapper}>
                        <button type='submit' className={styles.submit_button}>
                            Submit
                        </button>
                        <button type='button' onClick={()=>dispatch(handleModalOpen(false))} className={styles.cancel_button}>
                            Cancel
                        </button>
                    </div>
                ) : null}
            </form>
      </div>
  );
};

export default TaskForm;
