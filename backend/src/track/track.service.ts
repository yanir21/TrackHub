import { Injectable } from '@nestjs/common';
import { S3 } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { UploadTrackDto } from './dto/upload-track.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITrack } from './track.entity';


@Injectable()
export class TrackService {
    private readonly s3Client: S3;
    private readonly bucketName = "trackhub-audiofiles";

    constructor(@InjectModel("Track") private trackModel: Model<ITrack>) {
        this.s3Client = new S3({region:"eu-north-1"});
    }

    async upload(uploadTrackDto: UploadTrackDto, trackBuffer: string): Promise<ITrack> {
        const params = {
            Key: uploadTrackDto.key,
            Bucket: this.bucketName,
            Body: trackBuffer,
            ContentType: 'audio/mpeg',
            ACL: 'public-read'
        }

        const multipartUpload = new Upload({
            client: this.s3Client,
            params
        });

        multipartUpload.on("httpUploadProgress", (progress) => {
            console.log(progress);
        });

        await multipartUpload.done();

        const newTrack = new this.trackModel({
            trackKey: uploadTrackDto.key
        });

        return newTrack.save();
    }
    

    async getTrackFileById(id: string): Promise<string> {
        const track: ITrack = await this.trackModel.findById(id);

        const params = {
            Key: track.trackKey,
            Bucket: this.bucketName
        }

        const trackFile = await this.s3Client.getObject(params);

        return trackFile.Body.transformToString("utf-8");
    }
}
