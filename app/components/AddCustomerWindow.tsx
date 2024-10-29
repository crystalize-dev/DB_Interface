import React from 'react';
import AddCustomerForm from '../customers/add/AddCustomerForm';

interface WindowsProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddCustomerWindow = ({ visible, setVisible }: WindowsProps) => {
    return (
        <>
            {visible && (
                <div
                    className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/70"
                    onMouseDown={() => setVisible(false)}
                >
                    <div
                        className="h-fit w-fit bg-transparent"
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <AddCustomerForm
                            redirect={false}
                            onSubmitFunc={() => setVisible(false)}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default AddCustomerWindow;
