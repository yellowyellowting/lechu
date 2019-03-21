import $ from 'jquery';
import upload from '../utils/upload';
import getImageDimen from '../utils/image';

class ImageUpload {

    constructor(root, option) {
        this.root = root;
        this.option = Object.assign({
            uploadUrl: '',
            mainTitle: '上传图片',
            subTitle: '',
            adjustHeight: true,
            pregressTip: '上传中•••'
        }, option);
    }

    /**
     * 显示上传进度
     */
    showUploadProgress() {
        this.uploadProgress = $(`<div class="upload-progress"><span class="upload-progress-text">${this.option.pregressTip}</span></div>`);
        this.uploadBox.append(this.uploadProgress);
    }

    /**
     * 隐藏上传进度
     */
    hideUploadProgress() {
        if (this.uploadProgress) {
            this.uploadProgress.remove();
        }
    }

    /**
     * 显示图片预览
     */
    showPreviewImage(imageUrl) {
        this.previewWrap = $(`
            <div class="upload-preview">
                <img class="preview-image" src=${imageUrl} />
                <div class="preview-close-btn"></div>
            </div>
        `);
        this.previewWrap.on('click', '.preview-close-btn', () => this.hidePreviewImage());
        this.uploadBox.append(this.previewWrap);
        
        if (this.option.adjustHeight) {
            // 异步获取网络图片的真实宽高
            getImageDimen(imageUrl)
            .then(({ width, height }) => {
                // 根据图片真实宽高，调整上传容器的高度，宽度保持不变
                let adjustHeight = this.uploadBox.width() / width * height;
                if (adjustHeight > this.uploadBox.height()) {
                    this.uploadBox.attr('original-height', this.uploadBox.height());
                    this.uploadBox.height(adjustHeight);
                }
            });
        }
    }

    /**
     * 隐藏图片预览
     */
    hidePreviewImage() {
        if (this.previewWrap) {
            this.previewWrap.remove();
        }
        this.uploadInput.val('');
        this.uploadBox.height(this.uploadBox.attr('original-height'));
    }

    /**
     * 初始化UI
     */
    init() {
        if (this.root.hasClass('upload-box')) {
            return;
        }
        // 图片上传的容器
        this.uploadBox = this.root.addClass('upload-box');
        // 上传提示
        this.uploadTip = $(`
            <div class="upload-tip">
                <span class="upload-text">
                    <span class="main-title">${this.option.mainTitle}</span><br>
                    <span class="sub-title">${this.option.subTitle}</span>
                </span>
            </div>
        `);
        this.uploadBox.append(this.uploadTip);
        // 文件上传的input
        this.uploadInput = $(`<input class="fileupload" type="file" name="files[]" />`);
        this.uploadInput.change(e => this.upload(e.target.files[0]));
        this.uploadBox.append(this.uploadInput);
    }

    /**
     * 开始上传文件
     */
    upload(file) {
        if (!file || !this.option.uploadUrl) {
            return;
        }
        // 显示上传中
        this.showUploadProgress();
        
        upload(this.option.uploadUrl, file)
        .then(({ files }) => {
            // 隐藏上传中
            this.hideUploadProgress();

            const fileList = files || [];
            const fileInfo = fileList[0] || {};
            if (fileInfo) {
                this.showPreviewImage(fileInfo.url);
                // 回调上传完成
                this.option.onFinish && this.option.onFinish(fileInfo.url)
            }
        })
        .catch(() => {
            // 隐藏上传中
            this.hideUploadProgress();
        });
    }
}

$.fn.initImageUpload = function(option) {
    this.each(function() {
        this.imageUpload = new ImageUpload($(this), option);
        this.imageUpload.init();
    });
}

$.fn.doImageUpload = function(file) {
    this.each(function() {
        this.imageUpload && this.imageUpload.upload(file);
    });
}
