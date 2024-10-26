import React from 'react';
import Button from './UI/Button';

interface WindowsProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    funcOnSuccess?: (() => void) | undefined;
    funcOnFailure?: (() => void) | undefined;
}

const ConfirmWindow = ({
    visible,
    setVisible,
    funcOnFailure,
    funcOnSuccess
}: WindowsProps) => {
    const handleAccept = () => {
        setVisible(false);
        funcOnSuccess && funcOnSuccess();
    };

    const handleCancel = () => {
        setVisible(false);
        funcOnFailure && funcOnFailure();
    };

    return (
        <>
            {visible && (
                <div
                    className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/70"
                    onMouseDown={() => setVisible(false)}
                >
                    <div
                        className="flex h-fit w-fit flex-col items-center gap-8 rounded-md bg-white p-8"
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <h1 className="text-2xl font-bold">Подтвердить?</h1>
                        <div className="flex gap-8">
                            <Button
                                onClick={handleAccept}
                                type="button"
                                variant="colored"
                                buttonClassName="bg-green-500"
                            >
                                Подтвердить
                            </Button>
                            <Button
                                onClick={handleCancel}
                                type="button"
                                variant="colored"
                                buttonClassName="bg-red-500 "
                            >
                                Отменить
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ConfirmWindow;
