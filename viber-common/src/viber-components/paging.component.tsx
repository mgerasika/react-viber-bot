import React from 'react';
import { ViberButton } from './viber-button.component';
import { useServerActionBody } from '@viber-common/hooks/use-server-action-body.hook';

interface IProps {
    currentPage: number;
	totalPages: number;
	onChange?: (newPage:number) => void;
}


export const Paging = ({  currentPage, totalPages, onChange }: IProps): JSX.Element => {

	const handlePrevClick = useServerActionBody('handlePrevClick', (e) => {
		onChange && onChange(+e.actionArgument);
	});

	const handleNextClick = useServerActionBody('handleNextClick', (e) => {
		onChange && onChange(+e.actionArgument);
	});
    return (
        <>
            <ViberButton
                actionType={currentPage === 0 ? 'none' : 'reply'}
                Text={currentPage === 0 ? '' : 'Попередня'}
                Columns={2}
                Rows={1}
				actionBody={{
					...handlePrevClick,
                    actionArgument: currentPage - 1,
                }}
            />
            <ViberButton
                actionType="none"
                actionBody={undefined}
                Columns={2}
                Rows={1}
                Text={`${currentPage + 1} з ${totalPages}`}
            />
            <ViberButton
                actionType={currentPage === totalPages - 1 ? 'none' : 'reply'}
                Text={currentPage === totalPages - 1 ? '' : 'Наступна'}
                Columns={2}
                Rows={1}
                actionBody={{
                   ...handleNextClick,
                    actionArgument: currentPage + 1,
                }}
            />
            
			
        </>
    );
};
