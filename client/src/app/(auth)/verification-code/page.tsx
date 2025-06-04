"use client";

import MainButton from "@/components/MainButton";
import { useAuthUser } from "@/store/authStore";
import { useSearchParams } from "next/navigation";
import { useRef, useState, useEffect } from "react";

const VerificationInput = () => {

	const { isVerifingCode, userVerifyCode } = useAuthUser();

	const searchParams = useSearchParams();
	const email = searchParams.get('email')

	const inputLength = 6;
	const [data, setData] = useState<string[]>(Array(inputLength).fill(""));
	const inputRef = useRef<(HTMLInputElement | null)[]>([]);

	// Focus the first empty input
	const focusFirstEmptyInput = () => {
		const firstEmptyIndex = data.findIndex((item) => item === "");
		if (firstEmptyIndex !== -1) {
			inputRef.current[firstEmptyIndex]?.focus();
		}
	};

	// Handle input change
	const handleInputChange = (index: number, value: string) => {
		if (/^\d$/.test(value) || value === "") {
			const newData = [...data];
			newData[index] = value;
			setData(newData);

			// Move to the next input if a digit is entered
			if (value && index < inputLength - 1) {
				inputRef.current[index + 1]?.focus();
			}
		}
	};

	// Handle paste event
	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, inputLength);
		const newData = [...data];

		let j = 0;
		for (let i = 0; i < inputLength; i++) {
			if (newData[i] === "" && j < pasteData.length) {
				newData[i] = pasteData[j];
				j++;
			}
		}

		setData(newData);
		focusFirstEmptyInput();
	};

	// Handle keyboard navigation
	const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "ArrowLeft" && index > 0) {
			inputRef.current[index - 1]?.focus();
		}

		if (e.key === "ArrowRight" && index < inputLength - 1) {
			inputRef.current[index + 1]?.focus();
		}

		if (e.key === "Backspace" && !data[index] && index > 0) {
			const newData = [...data];
			newData[index - 1] = "";
			setData(newData);
			inputRef.current[index - 1]?.focus();
		}
	};

	// Focus the first input on mount
	useEffect(() => {
		focusFirstEmptyInput();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

        if (email && data.length === 6) {
 
			const code = Number(data.join(''));

			const res = await userVerifyCode(email, code)

			console.log(res)
		}
	}

	return (
		<div className="flex items-center justify-center  ctm-height">
			<form className="w-[90%] shadow-lg max-w-[500px] mt-10 mb-10 p-6 rounded-lg bg-white"
			  onSubmit={handleSubmit}
			>
				<h2 className="text-center text-xl text-hoverLinkColor mb-4">
					 يرجى ادخال كود التحقق
				</h2>
				<div className="flex items-center justify-center gap-3 ltr-dir">
					{data.map((item, index) => (
						<input
							key={index}
							type="text"
							className="border w-12 h-12 rounded-full text-center  focus:border-hoverLinkColor block"
							ref={(ref) => {
								if (ref) inputRef.current[index] = ref;
							}}
							maxLength={1}
							value={item}
							onChange={(e) => handleInputChange(index, e.target.value)}
							onPaste={handlePaste}
							onKeyDown={(e) => handleKeyDown(index, e)}
							inputMode="numeric"
							aria-label={`Verification code digit ${index + 1}`}
						/>
					))}
				</div>

				<div className="flex items-center justify-center mt-4" >
				   {isVerifingCode ? ( <MainButton text="ارسال" loading /> ) :  ( <MainButton text="ارسال" /> )}
				</div>
			</form>
		</div>
	);
};

export default VerificationInput;
