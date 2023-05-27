import { Injectable } from '@nestjs/common';
import { S3 } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { UploadTrackDto } from './dto/upload-track.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITrack } from './track.entity';
import { Track } from './track.schema';

@Injectable()
export class TrackService {
    private readonly s3Client: S3;
    private readonly bucketName = 'trackhub-audiofiles';

    constructor(@InjectModel('Track') private trackModel: Model<ITrack>) {
        this.s3Client = new S3({ region: 'eu-north-1' });
    }

    async upload(
        uploadTrackDto: UploadTrackDto,
        trackBuffer: string
    ): Promise<ITrack> {
        const params = {
            Key: uploadTrackDto.key,
            Bucket: this.bucketName,
            Body: trackBuffer,
            ContentType: 'audio/mpeg',
            ACL: 'public-read'
        };

        const multipartUpload = new Upload({
            client: this.s3Client,
            params
        });

        multipartUpload.on('httpUploadProgress', (progress) => {
            console.log(progress);
        });

        await multipartUpload.done();

        const newTrack = new this.trackModel({
            trackKey: uploadTrackDto.key
        });

        return newTrack.save();
    }

    async getTrack(key: string) {
        const params = {
            Key: key,
            Bucket: this.bucketName
        };

        const track = await this.s3Client.getObject(params);

        return track.Body.transformToString('utf-8');
    }
}
