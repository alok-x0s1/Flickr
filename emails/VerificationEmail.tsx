import {
	Html,
	Head,
	Body,
	Container,
	Heading,
	Text,
} from "@react-email/components";

interface VerificationEmailProps {
	username: string;
	otp: string;
}

export const VerificationEmail: React.FC<VerificationEmailProps> = ({
	username,
	otp,
}) => {
	return (
		<Html>
			<Head />
			<Body style={styles.body}>
				<Container style={styles.container}>
					<Heading style={styles.heading}>Email Verification</Heading>
					<Text style={styles.text}>Hello, {username}!</Text>
					<Text style={styles.text}>
						Your OTP code for verification is:{" "}
						<strong style={styles.otp}>{otp}</strong>
					</Text>
					<Text style={styles.text}>
						Please enter this code in the application to complete
						your registration.
					</Text>
					<Text style={styles.text}>Thank you for joining us!</Text>
					<Text style={styles.footer}>
						If you did not request this email, please ignore it.
					</Text>
				</Container>
			</Body>
		</Html>
	);
};

const styles = {
	body: {
		backgroundColor: "#f6f9fc",
		fontFamily: "Arial, sans-serif",
		padding: "20px",
		margin: "0",
	},
	container: {
		maxWidth: "600px",
		margin: "0 auto",
		backgroundColor: "#ffffff",
		padding: "20px",
		borderRadius: "8px",
		boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
	},
	heading: {
		fontSize: "24px",
		fontWeight: "bold",
		color: "#333333",
		marginBottom: "20px",
	},
	text: {
		fontSize: "16px",
		color: "#333333",
		margin: "10px 0",
	},
	otp: {
		fontSize: "18px",
		color: "#FF6347",
	},
	footer: {
		fontSize: "12px",
		color: "#777777",
		marginTop: "30px",
		borderTop: "1px solid #dddddd",
		paddingTop: "10px",
	},
} as const;

export default VerificationEmail;
