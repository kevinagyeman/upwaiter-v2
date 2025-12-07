import { AccountSettings } from "@stackframe/stack";

export default function MyAccountPage() {
	return (
		<AccountSettings
			fullPage={true}
			//   extraItems={[{
			//     title: 'Custom Section',
			//     iconName: "Settings",
			//     // content: <CustomContent />,
			//     // subpath: '/custom',
			//   }]}
		/>
	);
}
