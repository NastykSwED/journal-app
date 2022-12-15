import { useEffect, useMemo, useState } from 'react';

export const useForm = (
	initialForm: formProps,
	formValidations?: formValidationsProps
) => {
	const [formState, setformState] = useState(initialForm);
	const [formValidation, setFormValidation] = useState<formValidationProps>(
		{} as formValidationProps
	);

	const isFormValid = useMemo(() => {
		for (const formValue of Object.keys(formValidation)) {
			if (formValidation[formValue] !== null) {
				return false;
			}
		}

		return true;
	}, [formValidation]);

	const createValidators = () => {
		const formCheckedValues: formValidationProps = {
			displayNameValid: null,
			emailValid: null,
			passwordValid: null,
		};

		if (formValidations) {
			for (const formField of Object.keys(formValidations)) {
				const [fn, errorMessage] = formValidations[formField];

				formCheckedValues[`${formField}Valid`] = fn(formState[formField]!)
					? null
					: errorMessage;

				setFormValidation(formCheckedValues);
			}
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setformState({
			...formState,
			[e.target.name]: e.target.value,
		});
	};

	const handleResetForm = () => {
		setformState(initialForm);
	};

	useEffect(() => {
		createValidators();
	}, [formState]);

	return {
		...formState,
		handleChange,
		handleResetForm,
		formState,
		...formValidation,
		isFormValid,
	};
};
