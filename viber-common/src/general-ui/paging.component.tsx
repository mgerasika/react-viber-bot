import React from 'react';
import { Button } from './button.component';
import { useServerAction } from '@viber-common/hooks/use-server-action-body.hook';

interface IProps {
    currentPage: number;
	totalPages: number;
	onChange?: (newPage:number) => void;
}


export const Paging = ({  currentPage, totalPages, onChange }: IProps): JSX.Element => {

	const handlePrevClick = useServerAction('handlePrevClick', (e) => {
		onChange && onChange(+e.actionArgument);
	});

	const handleNextClick = useServerAction('handleNextClick', (e) => {
		onChange && onChange(+e.actionArgument);
	});
    return (
        <>
            <Button
                ActionType={currentPage === 0 ? 'none' : 'reply'}
                Text={currentPage === 0 ? '' : 'Попередня'}
                Columns={2}
                Rows={1}
				ActionBody={{
					...handlePrevClick,
                    actionArgument: currentPage - 1,
                }}
            />
            <Button
                ActionType="none"
                ActionBody={undefined}
                Columns={2}
                Rows={1}
                Text={`${currentPage + 1} з ${totalPages}`}
            />
            <Button
                ActionType={currentPage === totalPages - 1 ? 'none' : 'reply'}
                Text={currentPage === totalPages - 1 ? '' : 'Наступна'}
                Columns={2}
                Rows={1}
                ActionBody={{
                   ...handleNextClick,
                    actionArgument: currentPage + 1,
                }}
            />
            
			
        </>
    );
};
