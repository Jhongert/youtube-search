import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchResult } from './search-result.model';
import { map } from 'rxjs/operators';

export const YOUTUBE_APY_KEY: string = "AIzaSyDXqNaqIY484OSMWf6s5-tPw_h-lSssT3U"; //"AIzaSyBAdIemh8_ITc9wh2bA_IomogIKhMXfQPw";
export const YOUTUBE_APY_URL: string = "https://www.googleapis.com/youtube/v3/search";

@Injectable()
export class YoutubeSearchService {
    constructor(
        private http: HttpClient,
        @Inject(YOUTUBE_APY_KEY) private apiKey: string,
        @Inject(YOUTUBE_APY_URL) private apiUrl: string
    ){}
    
    search(query: string): Observable<SearchResult[]> {
        const params: string = [
            `q=${query}`,
            `key=${this.apiKey}`,
            `part=snippet`,
            `type=video`,
            `maxResults=12`
          ].join('&');
        const queryUrl = `${this.apiUrl}?${params}`;
        return this.http.get(queryUrl)
            .pipe(
                map((response: any) => {
                    return <any>response['items'].map(item => {
                        return new SearchResult({
                            id: item.id.videoId,
                            title: item.snippet.title,
                            description: item.snippet.description,
                            thumbnailUrl: item.snippet.thumbnails.high.url
                        });
                    });
                })
            )
    }
}