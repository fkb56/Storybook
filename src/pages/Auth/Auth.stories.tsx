import Auth, {AuthProps} from './Auth';

export default {
    title: "Pages/Auth",
    component: Auth
};

export const Default = (props: AuthProps) => <Auth {...props} />;
