import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../hooks';
import { ItemTypes } from '../../../constants';
import { ColumnInputs, ModalInputState, ColumnState } from '../../../types';
import { sortArray } from '../../../utils';
import { createBoardColumn, getBoardColumns, updateBoardColumn } from '../../../requests';
import { columnFormSchema } from '../../../validation';
import { ModalWithForm } from '../../ModalWithForm';
import { ColumnItem } from '../ColumnItem';
import { ColumnListContainer, CreateColumnBtn, ColumnBtn } from './styled';

type ColumnListProps = {
  columns: ColumnState[];
  token: string | null;
  boardId?: string;
};

export const ColumnList = ({ columns, token, boardId }: ColumnListProps) => {
  const dispatch = useAppDispatch();
  const [, drop] = useDrop({ accept: ItemTypes.COLUMN });
  const [columnsList, setColumnsList] = useState(sortArray(columns));
  const [draggedColumn, setDraggedColumn] = useState<undefined | ColumnState>();
  const [isModalOpened, setIsModalOpened] = useState(false);

  useEffect(() => {
    setColumnsList(sortArray(columns));
  }, [columns]);

  const moveColumn = async (id: string, atIndex: number, movedId?: string) => {
    const temporaryColumnsList = [...columnsList];
    const columnData = findColumn(id);
    if (movedId) {
      setDraggedColumn(findColumn(movedId)?.column);
      if (columnData) {
        temporaryColumnsList.splice(columnData.index, 1);
        temporaryColumnsList.splice(atIndex, 0, columnData.column);
      }
      setColumnsList(temporaryColumnsList);
    } else {
      if (columnData && draggedColumn && boardId && token) {
        await dispatch(
          updateBoardColumn({
            token,
            boardId,
            column: { ...columnData.column, order: draggedColumn.order },
          })
        );
        await dispatch(getBoardColumns({ token, id: boardId }));
      }
    }
  };

  const findColumn = (id: string) => {
    const column = columnsList.find((column) => column.id === id);
    if (column)
      return {
        column,
        index: columnsList.indexOf(column),
      };
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ColumnInputs>({
    resolver: yupResolver(columnFormSchema),
    defaultValues: { title: '' },
  });

  const inputsOptions: ModalInputState<ColumnInputs>[] = [
    {
      textFieldProps: {
        size: 'small',
        id: 'outlined-basic',
        label: 'Column Title',
        variant: 'outlined',
        error: Boolean(errors.title),
        helperText: errors.title?.message,
      },
      name: 'title',
      control,
    },
  ];

  const createColumnHandler = ({ title }: ColumnInputs) => {
    if (token && boardId) dispatch(createBoardColumn({ token, boardId, columnTitle: title }));
    reset();
    setIsModalOpened(false);
  };

  const handleCloseModal = () => {
    setIsModalOpened(false);
    reset();
  };

  return (
    <>
      <ColumnListContainer ref={drop}>
        {columnsList.length > 0 &&
          columnsList.map(
            (column) =>
              boardId && (
                <ColumnItem
                  moveColumn={moveColumn}
                  findColumn={findColumn}
                  column={column}
                  key={column.id}
                  token={token}
                  boardId={boardId}
                />
              )
          )}
        <ColumnBtn>
          <CreateColumnBtn
            variant="contained"
            sx={{
              backgroundColor: 'primary.light',
              '&:hover': { backgroundColor: 'primary.main' },
            }}
            onClick={() => setIsModalOpened(true)}
          >
            Create Column
          </CreateColumnBtn>
        </ColumnBtn>
      </ColumnListContainer>

      {isModalOpened && (
        <ModalWithForm<ColumnInputs>
          titleText="Create column"
          inputs={inputsOptions}
          handleSubmit={handleSubmit(createColumnHandler)}
          isModalOpened={isModalOpened}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};
