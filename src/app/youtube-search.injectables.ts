import { 
    YOUTUBE_APY_KEY, 
    YOUTUBE_APY_URL, 
    YoutubeSearchService 
} from './youtube-search.service';

export const youTubeSearchInjectables: Array<any> = [
    {provide: YoutubeSearchService, useClass: YoutubeSearchService},
    {provide: YOUTUBE_APY_KEY, useValue: YOUTUBE_APY_KEY},
    {provide: YOUTUBE_APY_URL, useValue: YOUTUBE_APY_URL}
]