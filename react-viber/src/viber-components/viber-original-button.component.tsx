import { Json } from './json.component';

export interface IViberOriginalButtonProps {
    Columns: 1|2|3|4|5|6;
	Rows: 1 | 2 | 3 | 4 | 5 | 6 | 7;
	BgColor?: string;
	Silent?: boolean;
	BgMediaType?: 'picture' | 'gif';
	BgMedia?: string;
	BgMediaScaleType?: 'crop' | 'fill' | 'fit',
	ImageScaleType?: 'crop' | 'fill' | 'fit',
	BgLoop?: boolean;
	ActionType: 'reply' | 'share-phone' | 'location-picker' |  'none' | 'payment' | 'open-url';
	ActionBody?: string;
	Image?: string;
	Text: string;
	TextVAlign?: 'top' | 'middle' | 'bottom',
	TextHAlign?: 'left' | 'center' | 'right',
	TextPaddings?: [number, number, number, number];//0-12 each
	TextOpacity?: number;//0-100
	TextSize?: 'small' | 'regular' | 'large',
	OpenURLType?: 'internal' | 'external',
	OpenURLMediaType?: 'not-media' | 'video' | 'gif' | 'picture',
	TextBgGradientColor?: string;
	TextShouldFit?: boolean;
	InternalBrowser?: {
		ActionButton?: 'forward' | 'send' | 'open-externally' | 'send-to-bot' | 'none',
		ActionPredefinedURL?: string;
		TitleType?: 'domain' | 'default',
		CustomTitle?: string;
		Mode?: 'fullscreen' | 'fullscreen-portrait' | 'fullscreen-landscape' | 'partial-size',
		FooterType?: 'default' | 'hidden',
		ActionReplyData?: string;
	};
	Map?: {
		Latitude?: string;
		Longitude?: string;
	}
	Frame?: {
		BorderWidth?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
		BorderColor?: string;
		CornerRadius?:  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
	},
	MediaPlayer?: {
		Title?: string;
		Subtitle?: string;
		ThumbnailURL?: string;
		Loop?: boolean;
	}
}

export const ViberOriginalButton = ( props : IViberOriginalButtonProps): JSX.Element => {
    return (
		<Json
			addComa
            json={props}
        />
    );
};
